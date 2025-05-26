#pragma once
#include <v8.h> 

class NodeArg
{
public:
	NodeArg(const v8::FunctionCallbackInfo<v8::Value>& args);

	int arg_count();
	bool check_argc(int count);

	bool read_argv(int index, int32_t& arg);
	bool read_argv(int index, std::string& arg);
	bool read_argv(int index,v8::Persistent<v8::Function>& func);

	void arg_return(int);
private:
	bool check_index(int index);

	void throw_wrong_count();
	void throw_wrong_type();
	void throw_exception(const char* str);

	const v8::FunctionCallbackInfo<v8::Value>& args_;
	v8::Isolate* isolate_;
	int count_;
};

