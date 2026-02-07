import { Clock, Phone, Mail } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden md:block bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center justify-between">
        <p className="text-sm opacity-80">
          گروه ساختمانی انبوه سازان دلتا
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm opacity-80">
            <Clock className="h-3.5 w-3.5" />
            <span>{"شنبه - پنجشنبه: 7:00-18:00"}</span>
          </div>
          <a
            href="tel:09125703247"
            className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" />
            <span dir="ltr">09125703247</span>
          </a>
          <a
            href="mailto:alibastegi1396@yahoo.com"
            className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            <Mail className="h-3.5 w-3.5" />
            <span dir="ltr">alibastegi1396@yahoo.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
