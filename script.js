// 打字机效果 - 等待DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    var phrases = [
        "一次买断，永久使用",
        "一次买断，永久加速GTA5",
        "一次买断，永久加速鹅鸭杀",
        "一次买断，永久加速PUBG",
        "一次买断，永久加速绝地求生",
        "一次买断，永久加速APEX英雄",
        "一次买断，永久加速战地6",
        "一次买断，永久加速星际战甲",
        "一次买断，永久加速Roblox",
        "一次买断，永久加速我的世界",
        "一次买断，永久加速街霸6",
        "一次买断，永久加速Github",
        "一次买断，永久加速我的世界",
        "一次买断，永久加速CSGO2",
        "一次买断，永久加速吃鸡"
    ];

    var currentPhraseIndex = 0;
    var currentText = "";
    var isDeleting = false;
    var typewriterElement = document.getElementById('typewriter-text');
    var isFirstRun = true;
    var needContinueDelete = false;

    function getRandomPhraseIndex(excludeIndex) {
        var newIndex;
        do {
            newIndex = Math.floor(Math.random() * phrases.length);
        } while (newIndex === excludeIndex);
        return newIndex;
    }

    function getBaseText(phrase) {
        if (phrase.includes("加速")) {
            return "一次买断，永久加速";
        } else {
            return "一次买断，永久";
        }
    }

    function typeWriter() {
        var currentPhrase = phrases[currentPhraseIndex];
        var baseText = getBaseText(currentPhrase);

        if (isFirstRun) {
            currentText = currentPhrase;
            isFirstRun = false;
            isDeleting = false;
            typeSpeed = 2000;
        } else if (needContinueDelete) {
            currentText = currentText.substring(0, currentText.length - 1);
            typeSpeed = 50;
            if (currentText === baseText) {
                needContinueDelete = false;
                isDeleting = false;
                typeSpeed = 500;
            }
        } else if (isDeleting) {
            currentText = currentPhrase.substring(0, currentText.length - 1);
            typeSpeed = 50;
        } else {
            currentText = currentPhrase.substring(0, currentText.length + 1);
            typeSpeed = 100;
        }

        typewriterElement.innerHTML = currentText + '<span id="typewriter-cursor" style="display: inline-block; width: 5px; height: 1em; background: #87abff; margin-left: 2px; margin-top: -0.2em; vertical-align: middle; border-radius: 2px; animation: blink 1s infinite;"></span>';

        if (!isDeleting && currentText === currentPhrase) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === baseText) {
            var nextPhraseIndex = getRandomPhraseIndex(currentPhraseIndex);
            var nextPhrase = phrases[nextPhraseIndex];
            var nextBaseText = getBaseText(nextPhrase);

            if (currentText.length > nextBaseText.length) {
                needContinueDelete = true;
                currentPhraseIndex = nextPhraseIndex;
                typeSpeed = 500;
            } else {
                isDeleting = false;
                currentPhraseIndex = nextPhraseIndex;
                typeSpeed = 500;
            }
        }

        setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 1000);
});