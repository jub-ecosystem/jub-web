import {defineStore} from 'pinia'

export interface Catalog {

}

export const useUsersStore = defineStore('users', ()=>{
    // State
    const catalogs: Ref<any[]> = ref([])  

    async function fetchUsers() {
        // GET /users -> List[User]
        // GET /catalogs -> List[Catalog]
        const response = await fetch('http://localhost:5000/catalogs')
        const data = await response.json()
        console.log('Fetched catalogs:', data)

        // Simulate fetching users from an API
        catalogs.value = data
    }

    return {
        catalogs,
        fetchUsers
    }

})