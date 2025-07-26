import { useEffect } from "react";
import { useBreadcrumbStore } from "@/store/breadcrumbStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([{ label: "Cuenta", href: "/" }]);
  }, [setBreadcrumbs]);
  return (
    <Tabs defaultValue="account" className="w-[500px] h-[500px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Cuenta</TabsTrigger>
        <TabsTrigger value="password">Contraseña</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Cuenta</CardTitle>
            <CardDescription>
              Realiza cambios en tu cuenta aquí. Guarda los cambios cuando
              termines.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Usuario</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-primary">Guardar cambios</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Contraseña</CardTitle>
            <CardDescription>
              Cambia tu contraseña aquí. Después de guardarla, cerrarás sesión.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Contraseña actual</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Nueva contraseña</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-primary">Guardar cambios</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
