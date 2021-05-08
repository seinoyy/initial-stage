const gotoAppPermissionSetting = function() {
    if (plus.os.name === 'iOS') {
        var UIApplication = plus.ios.import('UIApplication');
        var application2 = UIApplication.sharedApplication();
        var NSURL2 = plus.ios.import('NSURL');
        var setting2 = NSURL2.URLWithString('app-settings:');
        application2.openURL(setting2);
        plus.ios.deleteObject(setting2);
        plus.ios.deleteObject(NSURL2);
        plus.ios.deleteObject(application2);
    } else {
        var Intent = plus.android.importClass('android.content.Intent');
        var Settings = plus.android.importClass('android.provider.Settings');
        var Uri = plus.android.importClass('android.net.Uri');
        var mainActivity = plus.android.runtimeMainActivity();
        var intent = new Intent();
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        var uri = Uri.fromParts('package', mainActivity.getPackageName(), null);
        intent.setData(uri);
        mainActivity.startActivity(intent);
    }
};

export default gotoAppPermissionSetting;
