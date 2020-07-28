<?php
class LogLevel {
    const CRITICAL  = 0;
    const ERROR     = 1;
    const WARNING   = 2;
    const DEBUG     = 3;
    const INFO      = 4;
}

class Logger {
  static $logLevel = LogLevel::INFO;

  public static function setLogLevel($level) {
    self::$logLevel = $level;
  }

  public static function critical($message) {
    error_log("[CRITICAL] {$message}");
	}

  public static function error($message) {
    if (self::$logLevel < 1) return;
    error_log("[ERROR] {$message}");
	}

  public static function warning($message) {
    if (self::$logLevel < 2) return;
    error_log("[WARNING] {$message}");
	}

  public static function debug($message) {
    if (self::$logLevel < 3) return;
    error_log("[DEBUG] {$message}");
	}

	public static function info($message) {
    if (self::$logLevel < 4) return;
    error_log("[INFO] {$message}");
	}
}
?>