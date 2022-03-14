import os

_AUTOSCALE_JS_CALLBACK = ""
_POSITION_AUTOSCALE_JS_CALLBACK = ""

with open(
    os.path.join(os.path.dirname(__file__), "custom/autoscale_cb.js"), encoding="utf-8"
) as _f:
    _AUTOSCALE_JS_CALLBACK = _f.read()

with open(
    os.path.join(os.path.dirname(__file__), "custom/position_autoscale_cb.js"),
    encoding="utf-8",
) as _f:
    _POSITION_AUTOSCALE_JS_CALLBACK = _f.read()
