

class ConfigApp {
    static ConfigAppInstance = null;

    constructor() {
        if (ConfigApp.ConfigAppInstance) {
            return ConfigApp.ConfigAppInstance;
        }
        ConfigApp.ConfigAppInstance = this;

        this.PORT = process.env.PORT || 3000;
        this.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/e-commerce-backend';
        this.JWT_SECRET = process.env.JWT_SECRET || 'secret';
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';
        this.name = 'E-Commerce App Config';
        this.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
        this.address = process.env.ADDRESS || '123 E-Commerce St, Shop City';
    }

    static get() {
        if (!ConfigApp.ConfigAppInstance) new ConfigApp();
        return ConfigApp.ConfigAppInstance;
    }
}

export default ConfigApp;
