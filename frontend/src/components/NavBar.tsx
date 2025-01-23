
interface NavbarProps {
  user: { name: string }
}

export default function Navbar({ user }: NavbarProps) {
    return (
        <nav className="flex items-center justify-between py-4 bg-primary text-primary-foreground">
            <h1 className="text-3xl font-bold">Alertes</h1>
            <div className="flex items-center space-x-4">
                <span className="text-xl">{user.name}</span>
            </div>
        </nav>
    )
}

