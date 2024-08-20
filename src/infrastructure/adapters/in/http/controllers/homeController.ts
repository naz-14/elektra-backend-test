import { Request, Response } from "express";

// Función para manejar la solicitud GET a la raíz
export const homeController = {
  getHome: (req: Request, res: Response) => {
    res.send("Hello World");
  },
};
