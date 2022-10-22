all: main

init-submodules:
	@if git submodule status | grep -E -q '^[-]|^[+]';\
		then git submodule update --init;\
	fi

main: init-submodules
	cd deps/flog && make
