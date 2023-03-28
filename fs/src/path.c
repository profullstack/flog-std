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
#include <libgen.h>

static JSValue _dirname(JSContext* context,
                        JSValueConst this_val,
                        int argc,
                        JSValueConst* argv) {

  const char* string = JS_ToCString(context, argv[0]);
  return JS_NewString(context, (const char*) dirname((char*) string));
}

static JSValue _basename(JSContext* context,
                        JSValueConst this_val,
                        int argc,
                        JSValueConst* argv) {
  const char* string = JS_ToCString(context, argv[0]);
  return JS_NewString(context, (const char*) basename((char*) string));
}

static JSValue _extname(JSContext* context,
                        JSValueConst this_val,
                        int argc,
                        JSValueConst* argv) {
  const char* string = JS_ToCString(context, argv[0]);
  char* _basename = basename((char*) string);
  int length = flog_string_length(_basename);
  for (size_t i = length - 1; i > 0; i--) {
    if (_basename[i] == '.') {
      char* extname = flog_string_slice(_basename, i, length-1);
      JSValue ret = JS_NewString(context, (const char*) extname);
      free(extname);
      return ret;
    }
  }
  return JS_NewString(context, "");
}

static int module_init(JSContext* context, JSModuleDef* module_def) {
  JSValue dirname = JS_NewCFunction(context, _dirname, "dirname", 0);
  JSValue basename = JS_NewCFunction(context, _basename, "basename", 0);
  JSValue extname = JS_NewCFunction(context, _extname, "extname", 0);

  JS_SetModuleExport(context, module_def, "dirname", dirname);
  JS_SetModuleExport(context, module_def, "basename", basename);
  JS_SetModuleExport(context, module_def, "extname", extname);
  return 0;
}

JSModuleDef* flog_module_init(JSContext* context, const char* name) {
  JSModuleDef* module_def = JS_NewCModule(context, name, module_init);
  if (!module_def) {
    return NULL;
  }

  JS_AddModuleExport(context, module_def, "dirname");
  JS_AddModuleExport(context, module_def, "basename");
  JS_AddModuleExport(context, module_def, "extname");

  return module_def;
}
