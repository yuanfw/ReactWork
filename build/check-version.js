/**
 * Created by zhangyuanyuan031 on 17/4/20.
 */

var semver = require('semver');
var chalk = require('chalk');
var packageConfig = require('../package.json');
var exec = function (cmd) {
    return require('child_process')
        .execSync(cmd).toString().trim()
};

var versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node
    },
    {
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    }
];

module.exports = function () {
    var warnings = [];
    for (var i = 0; i < versionRequirements.length; i++) {
        var mod = versionRequirements[i];
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            )
        }
    }

    if (warnings.length) {
        console.log(chalk.yellow('使用这个模板，你得升级你的modules'));
        for (var i = 0; i < warnings.length; i++) {
            var warning = warnings[i];
            console.log('  ' + warning);
        }
        process.exit(1);
    }
};

