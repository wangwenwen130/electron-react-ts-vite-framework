#pragma once
#ifdef WIN32
    #ifdef ezdesk_api_EXPORTS
        #define EZDESK_API extern "C" __declspec(dllexport)
    #else
        #define EZDESK_API extern "C" __declspec(dllimport)
    #endif
#else
    #define EZDESK_API extern "C"
#endif

// error code
#define EZDESK_OK                        = 0;
#define EZDESK_NO_PAIR_ID                = 1;
#define EZDESK_PASSWORD                  = 2;
#define EZDESK_ALREADY_PAIRED            = 3;
#define EZDESK_TOKEN                     = 4;
#define EZDESK_OPENAPI                   = 5;
#define EZDESK_UPSIDE_REGISTER_TIMEOUT   = 6;
#define EZDESK_DOWNSIDE_REGISTER_TIMEOUT = 7;
#define EZDESK_OPENAPI_TIMEOUT           = 8;

enum PermissionMask
{
    EZ_MASK_ALL                         = ~0,
    EZ_MASK_SCALE                       = 1 << 1,
    EZ_MASK_SCREEN_QUALITY              = 1 << 2,
    EZ_MASK_SCREEN                      = 1 << 3,
    EZ_MASK_RESOLUTION                  = 1 << 4,
    EZ_MASK_SHORTCUT                    = 1 << 5,
    EZ_MASK_WHITEBOARD                  = 1 << 6,
    EZ_MASK_RECORD                      = 1 << 7,
    EZ_MASK_SCREENSHOT                  = 1 << 8,
    EZ_MASK_MORE                        = 1 << 9,
    EZ_MASK_FULL_SCR                    = 1 << 10,
};

typedef void* EZDESK_HANDLE;
typedef void(*register_callback) (int error_code, const char* pair_id, void* user_data);
typedef void(*pair_callback)     (int error_code, int pid, int wnd_id, void* user_data);
typedef void(*quit_callback) (void* user_data);
typedef void(*peer_quit_callback) (void* user_data);
typedef void(*peer_timeout_callback) (void* user_data);
typedef void(*message_callback) (const char* message, void* user_data);

struct UpsideParam
{
    char* app_id;
    char* token;
    char* password;
    char* custom_id;
    char* platform_url;
    char* log_path;
    char* file_path;
    int language;

    register_callback cb1;
    pair_callback cb2;
    peer_quit_callback cb3;
    peer_timeout_callback cb4;
    message_callback cb5;
    void* user_data;
};

struct DownsideParam
{
    char* app_id;
    char* token;
    char* pair_id;
    char* password;
    char* custom_id;
    char* platform_url;
    char* log_path;
    char* file_path;
    int option;
    bool enable_p2p;
    int language;


    pair_callback cb1;
    peer_quit_callback cb2;
    peer_timeout_callback cb3;
    quit_callback cb4;
    message_callback cb5;
    void* user_data;
};

EZDESK_API void          ezdesk_path(const char* path);
EZDESK_API int           ezdesk_last_error();

EZDESK_API EZDESK_HANDLE start_upside(UpsideParam* param);
EZDESK_API void          stop_upside(EZDESK_HANDLE handle);

EZDESK_API EZDESK_HANDLE start_downside(DownsideParam* param);
EZDESK_API void          stop_downside(EZDESK_HANDLE handle);



