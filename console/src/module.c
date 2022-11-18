/* flog standard library
 * Copyright (C) 2022 <terrablue@posteo.is>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
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
