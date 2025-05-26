#include <node.h>
#include <v8.h>
#include <uv.h>
#include "node_arg.h"
#include "ezdesk_api.h"
#include "ezdesk_context.h"

using namespace v8;

static uv_async_t g_async;
static int options = 255;
static int  lang = 0;
static std::string file_path;
static std::string log_path;

void EzdeskPath(const FunctionCallbackInfo<Value>& args)
{
    Isolate* isolate = args.GetIsolate();
    v8::Local<v8::Context> context = isolate->GetCurrentContext();
    v8::String::Utf8Value path(isolate, args[0]->ToString(context).ToLocalChecked());
    ezdesk_path(*path);
}

void EzdeskOption(const FunctionCallbackInfo<Value>& args)
{
    NodeArg node_arg(args);
    int count = node_arg.arg_count();

    options = 0;
    for (int i = 0; i < count; i++)
    {
        std::string option;
        node_arg.read_argv(i, option);
        if (option == "all")
        {
            options |= EZ_MASK_ALL;
        }
        else if (option == "scale")
        {
            options |= EZ_MASK_SCALE;
        }
        else if (option == "screen quality")
        {
            options |= EZ_MASK_SCREEN_QUALITY;
        }
        else if (option == "screen")
        {
            options |= EZ_MASK_SCREEN;
        }
        else if (option == "resolution")
        {
            options |= EZ_MASK_RESOLUTION;
        }
        else if (option == "shortcut")
        {
            options |= EZ_MASK_SHORTCUT;
        }
        else if (option == "record")
        {
            options |= EZ_MASK_RECORD;
        }
        else if (option == "white board")
        {
            options |= EZ_MASK_WHITEBOARD;
        }
        else if (option == "screen shot")
        {
            options |= EZ_MASK_SCREENSHOT;
        }
        else if (option == "full screen")
        {
            options |= EZ_MASK_FULL_SCR;
        }
        else if (option == "more")
        {
            options |= EZ_MASK_MORE;
        }
    }
}

void EzdeskFilePath(const FunctionCallbackInfo<Value>& args)
{
    NodeArg node_arg(args);
    node_arg.check_argc(1);
    node_arg.read_argv(0, file_path);
}

void EzdeskLogPath(const FunctionCallbackInfo<Value>& args)
{
    NodeArg node_arg(args);
    node_arg.check_argc(1);
    node_arg.read_argv(0, log_path);
}

void EzdeskLang(const FunctionCallbackInfo<Value>& args)
{
    NodeArg node_arg(args);
    node_arg.check_argc(1);
    std::string lang_str;
    node_arg.read_argv(0, lang_str);
    if (lang_str == "ZH")
    {
        lang = 1;
    }
    else if (lang_str  == "EN")
    {
        lang = 0;
    }
}
 /*
  ezdesk_lib.startUpside(app_id
    , token
    , password
    , custom_id
    , onRegister(error_code, pair_id){}
    , onPaird(error_code){}
    , onQuit(){}
    , onTimeout(){}
    )
*/
void StartUpside(const FunctionCallbackInfo<Value>& args)
{
    EzdeskContext* ezdesk_context = create_context();

    //g_async.data = ezdesk_context;
    ezdesk_context->async = &g_async;

    std::string platform_url;
    std::string app_id;
    std::string token;
    std::string password;
    std::string custom_id;

    NodeArg node_arg(args);
    node_arg.check_argc(10);

    node_arg.read_argv(0, platform_url);

    node_arg.read_argv(1, app_id);
    node_arg.read_argv(2, token);
    node_arg.read_argv(3, custom_id);
    node_arg.read_argv(4, password);

    node_arg.read_argv(5, ezdesk_context->onRegister);
    node_arg.read_argv(6, ezdesk_context->onPaired);
    node_arg.read_argv(7, ezdesk_context->onQuit);
    node_arg.read_argv(8, ezdesk_context->onTimeout);
    node_arg.read_argv(9, ezdesk_context->onMessage);

    UpsideParam param   = { 0 };
    param.platform_url  = (char*)platform_url.c_str();
    param.app_id        = (char*)app_id.c_str();
    param.token         = (char*)token.c_str();
    param.password      = (char*)password.c_str();
    param.custom_id     = (char*)custom_id.c_str();
    param.language      = lang;
    param.file_path    = (char*)file_path.c_str();
    param.log_path     = (char*)log_path.c_str();
    param.cb1           = [](int error_code, const char* pair_id, void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_register(error_code, pair_id);
    };
    param.cb2           = [](int error_code, int pid, int wnd_id, void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_paired(error_code);
    };
    param.cb3           = [](void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_quit();
    };
    param.cb4           = [](void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_timeout();
    };
    param.cb5           = [](const char* message, void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_message(message);
    };
    param.user_data     = ezdesk_context;

    EZDESK_HANDLE ezdesk_handle = start_upside(&param);
    ezdesk_context->ezdesk_handle = ezdesk_handle;

    node_arg.arg_return(ezdesk_context->id);
}

 /*
  ezdesk_lib.stopUpside(ezdesk_handle)
*/
void StopUpside(const FunctionCallbackInfo<Value>& args)
{
    NodeArg node_arg(args);
    int32_t context_id = 0;

    node_arg.read_argv(0, context_id);
    EzdeskContext* context = find_context(context_id);
    if (context)
    {
        stop_upside(context->ezdesk_handle);
    }
}

 /*
  ezdesk_lib.startDownside(app_id
    , token
    , pairId
    , password
    , onPaird(error_code){}
    , onQuit(){}
    , onTimeout(){}
    , onselfQuit(){}
    )
*/
void StartDownside(const FunctionCallbackInfo<Value>& args)
{
    EzdeskContext* ezdesk_context = create_context();
    g_async.data = ezdesk_context;
    ezdesk_context->async = &g_async;

    std::string platform_url;
    std::string app_id;
    std::string token;
    std::string pair_id;
    std::string password;
    std::string custom_id;
    std::string user_desc;

    NodeArg node_arg(args);

    node_arg.check_argc(11);

    node_arg.read_argv(0, platform_url);
    node_arg.read_argv(1, app_id);
    node_arg.read_argv(2, token);
    node_arg.read_argv(3, pair_id);
    node_arg.read_argv(4, password);
    node_arg.read_argv(5, custom_id);

    node_arg.read_argv(6, ezdesk_context->onDownsidePaired);
    node_arg.read_argv(7, ezdesk_context->onQuit);
    node_arg.read_argv(8, ezdesk_context->onTimeout);
    node_arg.read_argv(9, ezdesk_context->onSelfQuit);
    node_arg.read_argv(10, ezdesk_context->onMessage);

    node_arg.arg_return(ezdesk_context->id);

    DownsideParam param = { 0 };
    param.platform_url  = (char*)platform_url.c_str();
    param.app_id        = (char*)app_id.c_str();
    param.token         = (char*)token.c_str();
    param.custom_id     = (char*)custom_id.c_str();
    param.pair_id       = (char*)pair_id.c_str();
    param.password      = (char*)password.c_str();
    param.option        = options;
    param.enable_p2p    = true;
    param.language      = lang;
    param.file_path    = (char*)file_path.c_str();
    param.log_path     = (char*)log_path.c_str();
    param.cb1           = [](int error_code, int pid, int wnd_id, void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_downside_paired(error_code,pid,wnd_id);
    };
    param.cb2           = [](void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_quit();
    };
    param.cb3           = [](void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_timeout();
    };
    param.cb4           = [](void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_self_quit();
    };
    param.cb5           = [](const char* message, void* user_data)
    {
        EzdeskContext* context = (EzdeskContext*)user_data;
        context->on_message(message);
    };
    param.user_data     = ezdesk_context;

    EZDESK_HANDLE ezdesk_handle = start_downside(&param);
    ezdesk_context->ezdesk_handle = ezdesk_handle;
    ezdesk_context->pair_id_ = pair_id;

    node_arg.arg_return(ezdesk_context->id);
}

 /*
  ezdesk_lib.stopDownside(ezdesk_handle)
*/
void StopDownside(const FunctionCallbackInfo<Value>& args)
{
    NodeArg node_arg(args);
    int32_t context_id = 0;

    node_arg.read_argv(0, context_id);
    EzdeskContext* context = find_context(context_id);
    if (context)
    {
        stop_downside(context->ezdesk_handle);
    }
}

void Init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "ezdeskPath", EzdeskPath);
    NODE_SET_METHOD(exports, "options", EzdeskOption);
    NODE_SET_METHOD(exports, "filePath", EzdeskFilePath);
    NODE_SET_METHOD(exports, "logPath", EzdeskLogPath);
    NODE_SET_METHOD(exports, "lang", EzdeskLang);
    NODE_SET_METHOD(exports, "startUpside", StartUpside);
    NODE_SET_METHOD(exports, "stopUpside", StopUpside);
    NODE_SET_METHOD(exports, "startDownside", StartDownside);
    NODE_SET_METHOD(exports, "stopDownside", StopDownside);

    uv_async_init(uv_default_loop(), &g_async, EzdeskContext::call_js_func);
}

NODE_MODULE(ezdeskNode, Init)

