#pragma once
#include "ezdesk_api.h"
#include <node.h> 
#include <v8.h> 
#include <stdint.h>
#include <uv.h> 
#include <string>
#include <functional>
#include <vector>


using namespace v8; 

class EzdeskContext
{
public:
    uint32_t id;
    uv_async_t* async; 
    EZDESK_HANDLE ezdesk_handle;

    Persistent<Function> onRegister;
    Persistent<Function> onPaired;
    Persistent<Function> onDownsidePaired;
    Persistent<Function> onQuit;
    Persistent<Function> onTimeout;
    Persistent<Function> onSelfQuit;
    Persistent<Function> onMessage;

    // for the js callback
    int error_code_;
    std::string pair_id_;
    std::string message_;

	std::function<void(Isolate* isolate)> callback_func_;

    void on_register(int error_code, const char* pair_id);
    void on_paired(int error_code);
    void on_downside_paired(int error_code, int pid, int wnd_id);
    void on_quit();
    void on_timeout();
	void on_self_quit();
	void on_message(const char* message);

	void do_callback();

	void make_callback(Persistent<Function>& func, const char* format, ...);

    static void call_js_func(uv_async_t* handle);
};

EzdeskContext* create_context();
bool destroy_context(uint32_t id);
void callback_context(EzdeskContext* context);
EzdeskContext* find_context(uint32_t id);

