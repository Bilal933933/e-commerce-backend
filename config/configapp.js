

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
        this.city = process.env.CITY || 'Shop City';
        this.country = process.env.COUNTRY || 'Country';
        this.postalCode = process.env.POSTAL_CODE || '123456';
        
    }

    static get() {
        if (!ConfigApp.ConfigAppInstance) new ConfigApp();
        return ConfigApp.ConfigAppInstance;
    }

    printConfig() {
        console.log("----- App Configuration -----");
        console.log(`PORT: ${this.PORT}`);
        console.log(`MONGO_URI: ${this.MONGO_URI}`);
        console.log(`JWT_SECRET: ${this.JWT_SECRET}`);
        console.log(`JWT_EXPIRES_IN: ${this.JWT_EXPIRES_IN}`);
        console.log(`Admin Email: ${this.adminEmail}`);
        console.log(`Address: ${this.address}, ${this.city}, ${this.country}, ${this.postalCode}`);
        console.log("------------------------------");
    }

    get() {
        return {
            PORT: this.PORT,
            MONGO_URI: this.MONGO_URI,
            JWT_SECRET: this.JWT_SECRET,
            JWT_EXPIRES_IN: this.JWT_EXPIRES_IN,
            name: this.name,
            adminEmail: this.adminEmail,
            address: this.address,
            city: this.city,
            country: this.country,
            postalCode: this.postalCode
        };
    }

    set(config) {
        this.PORT = config.PORT || this.PORT;
        this.MONGO_URI = config.MONGO_URI || this.MONGO_URI;
        this.JWT_SECRET = config.JWT_SECRET || this.JWT_SECRET;
        this.JWT_EXPIRES_IN = config.JWT_EXPIRES_IN || this.JWT_EXPIRES_IN;
        this.name = config.name || this.name;
        this.adminEmail = config.adminEmail || this.adminEmail;
        this.address = config.address || this.address;
        this.city = config.city || this.city;
        this.country = config.country || this.country;
        this.postalCode = config.postalCode || this.postalCode;
    }

    reset() {
        ConfigApp.ConfigAppInstance = null;
    }

}


export default ConfigApp;
