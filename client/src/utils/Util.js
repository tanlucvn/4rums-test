export const language = () => {
    const langs = ['vi', 'en']
    const langFromLS = langs.find(i => i === localStorage.getItem('lang'))
    const langFromNL = langs.find(i => i === window.navigator.language)

    return langFromLS ? langFromLS : langFromNL ? langFromNL : 'en'
}

export const counter = (count = 0) => {
    if (count < 1e3) return count
    if (count >= 1e3 && count < 1e6) return `${(count / 1e3).toFixed(1)}K`
    if (count >= 1e6 && count < 1e9) return `${(count / 1e6).toFixed(1)}M`
    if (count >= 1e9 && count < 1e12) return `${(count / 1e9).toFixed(1)}B`
}

export const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}