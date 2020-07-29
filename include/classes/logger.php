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

  private static function printLog($prefix, $file, $msg, $line) {
    $trace = debug_backtrace(true);
    $caller = $trace[2];

    // TODO: File name does not work for classes since they are not being called
    // Break on the / for files
    // $path = explode("/", $caller['file']);
    // $path = end($path);
    // Break on . for extension
    // $file = explode(".", $path)[0];

    // Normalize to length of CRITICAL 
    $prefix = str_pad("[{$prefix}]", 10, " ");
    
    error_log("{$prefix} ({$file}->{$caller['function']}, line {$line}) - {$msg}");
  }

  public static function setLogLevel($level) {
    self::$logLevel = $level;
  }

  public static function critical($file, $message, $line) {
    self::printLog("CRITICAL", $file, $message, $line);
	}

  public static function error($file, $message, $line) {
    if (self::$logLevel < 1) return;
    self::printLog("ERROR", $file, $message, $line);
	}

  public static function warning($file, $message, $line) {
    if (self::$logLevel < 2) return;
    self::printLog("WARNING", $file, $message, $line);
	}

  public static function debug($file, $message, $line) {
    if (self::$logLevel < 3) return;
    self::printLog("DEBUG", $file, $message, $line);
	}

	public static function info($file, $message, $line) {
    if (self::$logLevel < 4) return;
    self::printLog("INFO", $file, $message, $line);
	}
}
?>