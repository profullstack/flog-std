/*
 * Flog JavaScript Runtime, Standard Library
 * 
 * Copyright (c) Terrablue <terrablue@proton.me> and contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
#include <stdio.h>
#include <flog.h>

// https://console.spec.whatwg.org/#printer
static JSValue printer(JSContext* context,
                      JSValueConst this_val,
                      int argc,
                      JSValueConst* argv) {
  const char* string;
  size_t length;

  // logLevel currently ignored
  for (int i = 1; i < argc; i++) {
    if (i > 1) {
      putchar(' ');
    }
    string = JS_ToCStringLen(context, &length, argv[i]);
    if (!string) {
      return JS_EXCEPTION;
    }
    fwrite(string, 1, length, stdout);
    JS_FreeCString(context, string);
  }
  putchar('\n');

  return JS_UNDEFINED;
}

static int module_init(JSContext* context, JSModuleDef* module_def) {
  JSValue value = JS_NewCFunction(context, printer, "printer", 0);
  return JS_SetModuleExport(context, module_def, "default", value);
}

JSModuleDef* flog_module_init(JSContext* context, const char* name) {
  JSModuleDef* module_def = JS_NewCModule(context, name, module_init);
  if (!module_def) {
    return NULL;
  }

  JS_AddModuleExport(context, module_def, "default");

  return module_def;
}
