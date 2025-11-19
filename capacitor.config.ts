import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.yourcompany.myapp',
    appName: 'MyApp',
    webDir: 'build',
    server: {
        androidScheme: 'https'
    },
    android: {
        includePlugins: [
            '@capacitor/app',
            '@capacitor/haptics',
            '@capacitor/keyboard',
            '@capacitor/status-bar'
        ]
    },
    plugins: {
        StatusBar: {
            style: 'DARK',
            overlaysWebView: true
        },
        SplashScreen: {
            launchShowDuration: 0,
            backgroundColor: "#ffffffff",
            androidSplashResourceName: "splash",
            androidScaleType: "CENTER_CROP",
            showSpinner: false,
            splashFullScreen: true,
            splashImmersive: true
        }
    }
};

export default config;