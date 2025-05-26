#include "node_arg.h"

using namespace v8;

NodeArg::NodeArg(const v8::FunctionCallbackInfo<v8::Value>& args)
    : args_(args)
{
    isolate_ = args_.GetIsolate();
}

int NodeArg::arg_count()
{
    return args_.Length();
}

bool NodeArg::check_argc(int count)
{
    if (args_.Length() < count) 
    { 
        throw_exception("Wrong number of arguments");
        return false;
    } 
    else
    {
        return true;
    }
}

bool NodeArg::read_argv(int index, int32_t& arg)
{
    if (!check_index(index))
    {
        return false;
    }
    
    if (!args_[index]->IsInt32())
    {
        throw_wrong_type();
        return false;
    }
    arg = args_[index]->Int32Value(isolate_->GetCurrentContext()).ToChecked();  
    return true;
}

bool NodeArg::read_argv(int index, std::string& arg)
{
    if (!check_index(index))
    {
        return false;
    }
    if (!args_[index]->IsString())
    {
        throw_wrong_type();
        return false;
    }
    String::Utf8Value str(isolate_, args_[index]);
    arg = *str;
    return true;
}

bool NodeArg::read_argv(int index, v8::Persistent<v8::Function>& func)
{
    if (!check_index(index))
    {
        return false;
    }
    if (!args_[index]->IsFunction())
    {
        throw_wrong_type();
        return false;
    }
    Local<Function> callback = v8::Local<v8::Function>::Cast(args_[index]); 
    func.Reset(isolate_, callback);
    return true;
}

void NodeArg::arg_return(int ret)
{
    args_.GetReturnValue().Set(Number::New(isolate_, ret));  
}

bool NodeArg::check_index(int index)
{
    if (index > args_.Length() - 1)
    {
        return false;
    }
    else
    {
        return true;
    }
}

void NodeArg::throw_wrong_count()
{
    throw_exception("Wrong number of arguments");
}

void NodeArg::throw_wrong_type()
{
    throw_exception("Wrong number of arguments");
}

void NodeArg::throw_exception(const char* str)
{
    isolate_->ThrowException(Exception::TypeError( 
        String::NewFromUtf8(isolate_, str, NewStringType::kNormal).ToLocalChecked())); 
}

