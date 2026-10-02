import { 
    type User, 
    type VerifyDTO, 
    type AuthAttemptDTO, 
    // type AuthResponseDTO, 
    type LogoutDTO,
    type JubAuthResponseDTO,
    // type UserProfile,
    type UserSettings,
} from '@/types/index.types'


export interface VerifyBannerState {
    status: 'retrying' | 'success' | 'failed';
    attempt: number;
    countdown: number;
}
export const useAuthStore = defineStore('auth', () => {
    const user            = ref<User | null>(null);
    const settings        = ref<UserSettings | null>(null);
    const isLoading       = ref(false);
    const error           = ref<string | null>(null);
    const isVerified      = ref(false);
    const showAuthDialog  = ref(false);
    const pendingRedirect = ref<string | null>(null);

    const verifyBanner  = ref<VerifyBannerState | null>(null);
    const _verifyAbort  = ref<boolean>(false);

    const XOLO_API_URL = import.meta.env.VITE_XOLO_API_URL || 'http://localhost:10000/api/v4';
    const JUB_API_URL = import.meta.env.VITE_JUB_API_URL || 'http://localhost:5000/api/v2';

    function clearLocalStorage() {
        localStorage.removeItem("token");
        localStorage.removeItem("secret");
        localStorage.removeItem("username");
    }
    async function verifyToken(data: VerifyDTO) {
        isLoading.value  = true;
        error.value      = null;
        isVerified.value = false;
        // console.log("Verifying token with data:", data);
        try {
            const response = await fetch(`${XOLO_API_URL}/users/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            console.log("Verification response status:", response.status);

            if (response.ok) {
                isVerified.value = true;
            } else {
                isVerified.value = false;

                const errorData = await response.json();
                console.error("Verification failed:", errorData);
                error.value = errorData.message || "Failed to verify token.";
                return isVerified.value;
                // throw new Error("Failed to verify token.");
            }


        } catch (err:any) {
            isVerified.value = false;
            error.value = err.message || "An error occurred during verification.";
        } finally {
            isLoading.value = false;
        }

        return isVerified.value;
    }

    async function verifyWithRetry(dto: VerifyDTO, maxAttempts = 3): Promise<boolean> {
        const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
        _verifyAbort.value = false;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            if (_verifyAbort.value) return false;

            const ok = await verifyToken(dto);
            if (ok) {
                if (verifyBanner.value) {
                    verifyBanner.value = { status: 'success', attempt, countdown: 0 };
                    await delay(2200);
                    verifyBanner.value = null;
                }
                return true;
            }
            if (attempt < maxAttempts) {
                for (let s = 4; s > 0; s--) {
                    if (_verifyAbort.value) return false;
                    verifyBanner.value = { status: 'retrying', attempt, countdown: s };
                    await delay(1000);
                }
            } else {
                verifyBanner.value = { status: 'failed', attempt, countdown: 0 };
                showAuthDialog.value = true;
            }
        }
        return false;
    }

    function cancelRetry(): void {
        _verifyAbort.value = true;
        verifyBanner.value = null;
        showAuthDialog.value = true;
    }

    function getUser(): User | null {
        return user.value;
    }
    async function login(payload: AuthAttemptDTO) {      
        // Implement login logic here
        try {
            console.log("Attempting login with payload:", payload);
            console.log("Using JUB API URL:", JUB_API_URL); 

            const response = await fetch(`${JUB_API_URL}/users/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            console.log("Login response status:", response.status);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Login failed:", errorData);
                throw new Error("Failed to login.");
            }
            const data = await response.json() as JubAuthResponseDTO;
            console.log("Login successful, received data:", data);
            // Simulate successful login
            localStorage.setItem("username", payload.username);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("secret", data.temporal_secret_key);
            
            user.value = {
                username: data.user_profile.username,
                first_name: data.user_profile.first_name,
                last_name: data.user_profile.last_name,
                email: data.user_profile.email,
                profile_photo: `https://api.dicebear.com/9.x/bottts/svg?seed=${data.user_profile.fullname}`,
                fullname: data.user_profile.fullname,
                user_id: data.user_profile.user_id,
                // role: data.user_profile.role
            };
            settings.value = data.user_profile.settings;
            // profile.value = data.user_profile;
            isVerified.value = true;
            return true;
        } catch (err) {
            console.error("Login error:", err);
            error.value = "An error occurred during login.";
            return false;
        }finally{
            isLoading.value = false;
        }
    
    }
    async function logout(){
        const payload: LogoutDTO = {  
            access_token: localStorage.getItem("token") || "",
            username: localStorage.getItem("username") || ""
        }
        try {
            isLoading.value = true;
            error.value = null;
            await fetch(`${XOLO_API_URL}/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
                    "Temporal-Secret-Key": localStorage.getItem("secret") || ""
                },
                body: JSON.stringify(payload),
            });
            return true;
        } catch (err) {
            console.error("Logout error:", err);
            error.value = "An error occurred during logout.";
            return false;
        } finally {
            // localStorage.removeItem("access_token");
            localStorage.removeItem("token");
            localStorage.removeItem("secret");
            localStorage.removeItem("username");
            localStorage.removeItem("mictlanx-store");
            user.value = null;
            isVerified.value = false;
            isLoading.value = false;
        }

    }

    return {
        user,
        isLoading,
        error,
        isVerified,
        showAuthDialog,
        pendingRedirect,
        settings,
        verifyBanner,
        getUser,
        verifyToken,
        verifyWithRetry,
        cancelRetry,
        login,
        logout,
        clearLocalStorage
    }

},{
    persist: { omit: ['verifyBanner', 'isLoading', 'error'] }
})