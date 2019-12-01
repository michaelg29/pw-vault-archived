let global = {
    data: [
        {
            "name": "Google",
        },
        {
            "name": "Twitter",
        },
        {
            "name": "123movies",
        },
        {
            "name": "putlocker",
        },
        {
            "name": "GitHub",
        }
    ]
}

let state = {
    list: []
}

if (global.data !== []) {
    global.data.array.forEach((info) => {
        let sorter = info.name.charAt(0).toUpperCase();

        let sectionFound = false;

        state.list.forEach((section) => {
            if (sorter === section.title) {
                section.data.push(info.name);
                sectionFound = true;
                return;
            }
        });

        if (!sectionFound) {
            // create section for site
            state.list.push({
                title: sorter,
                data: [info.name]
            })
        }
    });
}