const shareTextsByMode = {
    freeMode: (gameStats) => {
        return `Circle Sonuç (Serbest Mod - ${gameStats.difficulty})
Son kelime: ${gameStats.answers.at(-1)}
Skor: ${gameStats.score}
Seçili harf: ${gameStats.selectedLetters.join(" - ")}
https://lordeveck.github.io/circle/
        `;
    },
    dailyMode: (gameStats) => {
        return `Circle Sonuç (Günlük Mod - ${gameStats.difficulty})
Girilen Kelime Sayısı: ${gameStats.score}
https://lordeveck.github.io/circle/
        `;
    },
};

export default shareTextsByMode;
