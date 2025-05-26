#include "ezdesk_context.h"
#include <stdarg.h> 
#include <map>

static std::map<uint32_t,EzdeskContext*> context_map;

EzdeskContext* create_context()
{
    EzdeskContext* context = new EzdeskContext;

    static uint32_t id = 0;
    context_map[++id] = context;
    context->id = id;
    return context;
}
bool destroy_context(uint32_t id)
{
    EzdeskContext* context = find_context(id);
    if(context)
    {
        delete context;
        context_map.erase(id);
        return true;
    }
    else
    {
        return false;
    }
}

void callback_context(EzdeskContext* context)
{
    uv_async_send(context->async); 
}

EzdeskContext* find_context(uint32_t id)
{
    auto iter = context_map.find(id);
    if(iter == context_map.end())
    {
        return nullptr;
    }
    else
    {
        return iter->second;
    }
}

void EzdeskContext::on_register(int error_code, const char* pair_id)
{
    error_code_ = error_code;
    pair_id_ = pair_id;
    async->data = this;
    callback_func_ = [&](Isolate* isolate)
    {
        make_callback(onRegister,"ds",error_code_,pair_id_.c_str());
    };
    uv_async_send(async); 
}

void EzdeskContext::on_paired(int error_code)
{
    error_code_ = error_code;
    async->data = this;
    callback_func_ = [=](Isolate* isolate)
    {
        make_callback(onPaired,"ds",error_code_,pair_id_.c_str());
    };
    uv_async_send(async); 
}

void EzdeskContext::on_downside_paired(int error_code, int pid, int wnd_id)
{
    error_code_ = error_code;
    async->data = this;
    callback_func_ = [=](Isolate* isolate)
    {
        make_callback(onDownsidePaired,"dsdd",error_code_,pair_id_.c_str(),pid,wnd_id);
    };
    uv_async_send(async); 
}

void EzdeskContext::on_quit()
{
    async->data = this;
    callback_func_ = [&](Isolate* isolate)
    {
        make_callback(onQuit,"s",pair_id_.c_str());
    };

    uv_async_send(async); 
}

void EzdeskContext::on_timeout()
{
    async->data = this;
    callback_func_ = [&](Isolate* isolate)
    {
        make_callback(onTimeout,"s",pair_id_.c_str());
    };
    uv_async_send(async); 
}

void EzdeskContext::on_self_quit()
{
    async->data = this;
    callback_func_ = [&](Isolate* isolate)
    {
        make_callback(onSelfQuit,"s",pair_id_.c_str());
    };
    uv_async_send(async); 
}

void EzdeskContext::on_message(const char* message)
{
    async->data = this;
    message_ = message;
    callback_func_ = [&](Isolate* isolate)
    {
        make_callback(onMessage,"ss",message_.c_str(),pair_id_.c_str());
    };
    uv_async_send(async); 
}

void EzdeskContext::do_callback()
{
    Isolate* isolate = Isolate::GetCurrent(); 
    HandleScope scope(isolate); 
    async->data = this;
    if (callback_func_)
    {
        callback_func_(isolate);
    }
}

void EzdeskContext::make_callback(Persistent<Function>& func,const char* format, ...)
{ 
    Isolate* isolate = Isolate::GetCurrent(); 
    std::vector<Local<Value>> arg_values;

    va_list args; 
    va_start(args, format); 
    while(*format != '\0')
    { 
        if (*format == 'd')
        { 
            arg_values.push_back(Number::New(isolate, va_arg(args, int)));
        } 
        else if (*format == 's')
        { 
            arg_values.push_back(String::NewFromUtf8(isolate, va_arg(args, char*), NewStringType::kNormal).ToLocalChecked());
        } 
        ++format; 
    } 
    va_end(args); 

    Local<Context> node_context = isolate->GetCurrentContext(); 
    Local<Function> local_func = Local<Function>::New(isolate, func); 
    local_func->Call(node_context, Null(isolate), arg_values.size(), arg_values.data()); 
} 

void EzdeskContext::call_js_func(uv_async_t* handle)
{
    EzdeskContext* context = (EzdeskContext*)handle->data;
    if(!context)
    {
        return;
    }
    context->do_callback();
}

