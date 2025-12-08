import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { User, Mail, Save, Edit2, LogOut } from "lucide-react";
import NeonButton from "./NeonButton";
import NeonInput from "./NeonInput";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface ProfileData {
  name: string;
  email: string;
}

interface ProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDemo?: boolean;
}

export default function ProfileSheet({ open, onOpenChange, isDemo = false }: ProfileSheetProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: isDemo ? "Demo Student" : "John Doe",
    email: isDemo ? "demo@neuroaura.app" : "john.doe@university.edu",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleLogout = () => {
    onOpenChange(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const fields = [
    { key: "name", label: "Full Name", icon: User, type: "text" },
    { key: "email", label: "Email", icon: Mail, type: "email" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-background/95 backdrop-blur-xl border-l border-primary/20 w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-orbitron text-xl text-gradient">My Profile</SheetTitle>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "p-2 rounded-lg transition-all",
                isEditing 
                  ? "bg-primary/20 text-primary" 
                  : "bg-muted/30 text-muted-foreground hover:text-primary"
              )}
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center py-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
              <span className="text-3xl font-orbitron text-primary">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <p className="mt-4 font-orbitron text-lg text-foreground">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="text-xs font-orbitron uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <field.icon className="w-3 h-3" />
                {field.label}
              </label>
              {isEditing ? (
                <NeonInput
                  type={field.type}
                  value={profile[field.key as keyof ProfileData]}
                  onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                  className="w-full"
                />
              ) : (
                <div className="px-4 py-3 rounded-xl bg-muted/20 border border-border/30 text-foreground">
                  {profile[field.key as keyof ProfileData]}
                </div>
              )}
            </div>
          ))}

          {isEditing && (
            <div className="pt-4">
              <NeonButton onClick={handleSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </NeonButton>
            </div>
          )}

          {/* Logout Button */}
          <div className="pt-6 border-t border-border/30 mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-all font-orbitron text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
