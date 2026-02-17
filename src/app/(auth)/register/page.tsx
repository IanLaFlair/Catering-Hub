import Link from "next/link";
import { UtensilsCrossed, Store, ChefHat, ArrowRight } from "lucide-react";

const roles = [
    {
        icon: UtensilsCrossed,
        title: "Customer",
        description: "Pesan catering untuk acara Anda",
        roleId: "CUSTOMER",
        color: "text-primary",
        bg: "bg-orange-50",
        border: "hover:border-primary",
    },
    {
        icon: Store,
        title: "Vendor Catering",
        description: "Jual paket catering & prasmanan",
        roleId: "VENDOR",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "hover:border-blue-600",
    },
    {
        icon: ChefHat,
        title: "UMKM Kuliner",
        description: "Jual menu satuan & snack box",
        roleId: "UMKM",
        color: "text-green-600",
        bg: "bg-green-50",
        border: "hover:border-green-600",
    },
];

export default function RegisterRolePage() {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Daftar sebagai...
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Pilih peran yang sesuai dengan kebutuhan Anda di CateringHub.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {roles.map((role) => (
                    <Link
                        key={role.roleId}
                        href={`/register/form?role=${role.roleId}`}
                        className={`group relative bg-white border-2 border-transparent ${role.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-center`}
                    >
                        <div className={`mx-auto w-14 h-14 ${role.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                            <role.icon className={`w-7 h-7 ${role.color}`} />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {role.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            {role.description}
                        </p>

                        <span className={`inline-flex items-center text-sm font-semibold ${role.color}`}>
                            Pilih
                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                ))}
            </div>

            <p className="mt-10 text-center text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-semibold text-primary hover:text-primary-hover">
                    Masuk di sini
                </Link>
            </p>
        </div>
    );
}
