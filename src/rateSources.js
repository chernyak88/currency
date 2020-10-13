const rateSources = [

    {
        func: () => {
            return fetch('https://www.cbr-xml-daily.ru/daily_json.js')
                .then(res => res.json())
                .then(data => {
                    let eur = {
                        currency: data.Valute.EUR.Name,
                        rate: data.Valute.EUR.Value,
                        nominal: data.Valute.EUR.Nominal
                    }
                    return eur
                })
        }
    },
    {
        func: async () => {
            const res = await fetch('https://www.cbr-xml-daily.ru/daily_utf8.xml')
            const res1 = await res.text()
            const parser = new DOMParser()
            const dom = parser.parseFromString(res1, "application/xml")
            let eur = {
                currency: dom.querySelector('*[ID="R01239"] Name').innerHTML,
                rate: dom.querySelector('*[ID="R01239"] Value').innerHTML,
                nominal: dom.querySelector('*[ID="R01239"] Nominal').innerHTML
            }
            return eur
        }
    },

]

export default rateSources