node-gyp configure
node-gyp rebuild --arch=x64

cp ./build/Release/ezdesk.node ./release/mac_x64
install_name_tool -add_rpath @loader_path/bin ./release/mac_x64/ezdesk.node
