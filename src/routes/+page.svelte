<script>
    let results = [
        {
            nip: '1231231212',
            name: 'Nazwa podatnika',
            address: 'Jarzębinowa 10, 00-000 Warszawa',
            account: '11 1234 1234 1234 1234 1234 1234',
            status: 'Dane zgodne',
            color: 'bg-green-100',
            icon: '✔️',
            action: 'Pobierz potwierdzenie',
            link: 'Link do oryginału'
        },
        {
            nip: '1231231212',
            name: 'Nazwa podatnika',
            address: 'Jarzębinowa 10, 00-000 Warszawa',
            account: '11 1234 1234 1234 1234 1234 1234',
            status: 'Do weryfikacji',
            color: 'bg-gray-200',
            icon: '📄',
            action: 'Pobierz potwierdzenie',
            link: 'Link do oryginału'
        },
        {
            nip: '1231231212',
            name: 'Nazwa podatnika',
            address: 'Jarzębinowa 10, 00-000 Warszawa',
            account: '11 1234 1234 1234 1234 1234 1234',
            status: 'Brak zgodności',
            color: 'bg-red-100',
            icon: '❌',
            action: 'Pobierz potwierdzenie',
            link: 'Link do oryginału'
        }
    ];
</script>

<div class="container mx-auto p-4">
    <div class="bg-white shadow-md rounded-lg">
        <h1 class="text-xl font-bold p-4">Wyniki wyszukiwania</h1>
        <div class="space-y-4 p-4">
            {#each results as result}
                <div class={`p-4 rounded-lg ${result.color} border border-gray-300`}>
                    <div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center">
                        <div class="flex-1">
                            <div class="flex flex-wrap sm:flex-nowrap sm:space-x-8">
                                <div>
                                    <p class="font-bold">NIP {result.nip}</p>
                                    <p>{result.name}</p>
                                    <p>{result.address}</p>
                                </div>
                                <div class="mt-2 sm:mt-0">
                                    <p class="text-lg font-semibold">Numer konta {result.account}</p>
                                    <p>Jest to jedyne konto podmiotu.</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0">
                            <div class="flex items-center space-x-2">
                                <span>{result.icon}</span>
                                <p>{result.status}</p>
                            </div>
                            <div class="flex flex-col items-start sm:items-end text-blue-500 underline">
                                <button>{result.action}</button>
                                <button>{result.link}</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>