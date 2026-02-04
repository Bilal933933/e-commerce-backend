class Logger {
    static instance = null;

    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
    }

    format(level, message) {
        const timestamp = new Date().toISOString();
        // تقطيع الرسالة إذا تجاوزت 200 حرف
        const truncatedMessage = message.length > 200 ? message.substring(0, 200) + '...' : message;
        return `[${timestamp}] ${level}: ${truncatedMessage}`;
    }

    write(level, message) {
        if (level === 'ERROR') {
            console.error(this.format(level, message));
        } else {
            console.log(this.format(level, message));
        }
    }

    // دوال ثابتة تنشئ أو تستخدم نسخة Singleton
    static info(message) {
        const instance = Logger.instance || new Logger();
        instance.write('INFO', message);
    }

    static error(message) {
        const instance = Logger.instance || new Logger();
        instance.write('ERROR', message);
    }

    static warn(message) {
        const instance = Logger.instance || new Logger();
        instance.write('WARN', message);
    }
}

// اختياري: احتفظ بـ loggers المتخصصة إذا كنت تحتاجها
class InfoLogger extends Logger {
    log(message) {
        this.write('INFO', message);
    }
}

class ErrorLogger extends Logger {
    log(message) {
        this.write('ERROR', message);
    }
}

export { InfoLogger, ErrorLogger };
export default Logger;