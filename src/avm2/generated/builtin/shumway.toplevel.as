package {
  [native("print")]
  public native function trace(s);

  [native("print")]
  public native function print(s);

  [native("notImplemented")]
  public native function notImplemented(s);

  [native("unsafeJSNative")]
  public native function unsafeJSNative(s);

  [native("debugBreak")]
  public native function debugBreak(s);
}
