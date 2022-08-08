const shareTextsByMode = {
    freeMode: (gameStats) => {
        return `Circle Sonuç (Serbest Mod)
Son kelime: ${gameStats.answers.at(-1)}
Skor: ${gameStats.score}
Seçili harf: ${gameStats.selectedLetters.join(" - ")}
https://lordeveck.github.io/harf-zamani/
        `;
    },
    dailyMode: (gameStats) => {
        return `Circle Sonuç (Günlük Mod)
Girilen Harf Sayısı: ${gameStats.score}
https://lordeveck.github.io/harf-zamani/
        `;
    },
};

export default shareTextsByMode;
