const dropdownConfigs = [
    {
        id: 'expo-company-name',
        hasSearch: false,
        options: [           
            { name: 'Компания 1', value: 'topic1' },
            { name: 'Компания 2', value: 'topic2' },
            { name: 'Компания 3', value: 'topic3' },
            { name: 'Компания 5', value: 'topic4' },
        ]
    },
    {
        id: 'expo-specialization',
        hasSearch: false,
        options: [           
            { name: 'Специализация 1', value: 'category1' },
            { name: 'Специализация 2', value: 'category2' },
            { name: 'Специализация 3', value: 'category3' },
            { name: 'Специализация 5', value: 'category4' },
        ]
    },
];

initPageDropdowns(dropdownConfigs);