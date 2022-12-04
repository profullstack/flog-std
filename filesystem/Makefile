NAME=module
CFLAGS=-fPIC -Wall -O3 -L../deps/flog -l:-libqjs.a -c -I../deps/flog/src
SRCS=$(wildcard src/*.c)
OBJS=$(patsubst %.c,%.o,$(SRCS))
SO=$(NAME).so

all: $(NAME)

deps:
	cd .. && make

$(NAME): deps
	$(CC) $(CFLAGS) -o $(OBJS) $(SRCS)
	$(CC) -o src/$(SO) -shared -Wl,-soname=$(SO) -Wl,--start-group $(OBJS) -Wl,--end-group
	rm -r $(OBJS)
