interface parseDateType {
    year:string,
    month:string,
    day:string
}

export const parseDate = (date: string):string => {
    const parsedDate:parseDateType = getFormat(date);
    const newDate = `${parsedDate.day} ${month.get(parsedDate.month)}, ${parsedDate.year}`
    return newDate;
}

const month = new Map([

    ["01", "Jan"],
    ["02", "Feb"],
    ["03", "Mar"],
    ["04", "Apr"],
    ["05", "May"],
    ["06", "Jun"],
    ["07", "Jul"],
    ["08", "Aug"],
    ["09", "Sep"],
    ["10", "Oct"],
    ["11", "Nov"],
    ["12", "Dec"],
]
)

const getFormat = (date:string):parseDateType => {
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8,10);
    return {
        year,
        month,
        day
    }
}