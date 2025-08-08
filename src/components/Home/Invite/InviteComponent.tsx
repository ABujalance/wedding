import { Guest } from '@/lib/firebase/guest';
import { Invite } from '@/lib/firebase/invites';
import { List, ListItem, Stack, Typography } from '@mui/material';
import { FC, use } from 'react';
import { BusInfo } from './BusInfo/BusInfo';

type InviteComponentProps = {
  invite: Invite;
  guestsPromise: Promise<Guest[]>;
};

export const InviteComponent: FC<InviteComponentProps> = ({
  invite,
  guestsPromise,
}) => {
  const guests = use(guestsPromise);
  // Los tamaños de las fuentes deben ser más grandes en escritorio y más pequeños en móvil.
  // Además, las secciones se podrán alinear de forma diferente en función del tamaño de pantalla. Por ejemplo, el timeline aparece junto a la hora y lugar en escritorio (XL/L), pero por debajo en móbil y tablet.

  // Usar el tema siempre que sea posible para poner estilos y que sea más fácil de mantener. Cuidado con que no sobreescriban los estilos ya existentes en Home Page. Si es necesario, mover el wrapper del tema a esta página para no tener problemas.

  // Haz todos los subcomponentes que puedas, para que quede limpia las secciones.

  // Elimina todos los comentarios cuando termines.

  // No hagas acciones que requieran de mi confirmación porque me voy a ir varias horas, cuando vuelva quiero ver que has hecho y ya te corregiré si no me gusta.

  // Ignora los gaps que he puesto, están ahi solo para indicar secciones. Usa el espacio que creas necesario.

  // Cada una de las acciones que se puedan hacer deberan tener su llamada API. Recuerda solo dejar que se puedan modificar en esta llamada los campos pertinentes al formulario para mantener la seguridad. Solo si te tiene en numero de invitación se podran hacer, como ya hemos hablado anteriormente.
  return (
    <Stack gap={3}>
      <Stack gap={1}>
        Nombre asignado a la invitación, usando el mismo texto brillante que en
        Home. Para que los invitados se sientan importantes. Que ponga:
        Bienvenidos y el nombre de la invitación.
      </Stack>
      <Stack gap={1}>
        Carrusel con fotos nuestras (no demasiadas). Asegurarse que en móvil se
        ve bien. Aplicar máscara si es necesario para hacer un marco navideño
        alrededor. Debe quedar como fotos de navidad.
      </Stack>
      <Stack gap={1}>
        Fecha. Usar enlace a calendario similares al save-the-date. Utilizar
        cuenta atras para la fecha, pero no tan grande como en save the date.
        Colores y estilo más vintage/navideños.
      </Stack>
      <Stack gap={1}>
        Sitio. Usar enlace a google maps similares al save-the-date. Añadir
        fotos de la hacienda en distribución bonita disponibles en la carpeta
        assets/images
      </Stack>
      <Stack gap={1}>
        <Typography>Historia / Sobre nosotros</Typography>
        <Typography>
          Sobre el novio. Dejar hueco para poner una foto a ver si me gusta como
          queda
        </Typography>
        <Typography>
          Sobre la novia. Dejar hueco para poner una foto a ver si me gusta como
          queda
        </Typography>
        <Typography>
          Invitados de honor (nuestras mascotas). Deberan aparecer 3 tarjetas
          donde pondremos un dibujo que nos han hecho (imagen png disponibles en
          carpeta mascotas de imagenes) y una pequeña foto. Cada tarjeta
          contendrá una especie de postal como hecha por papa noel identificando
          a los niños malos y buenos. Las mascotas son Fu (Monsieur Fu), Bilbo y
          Nami. Son gato, gato y perra. Fu= Bueno, Bilbo = Regular, Nami =
          Buena.
        </Typography>
      </Stack>

      <Stack gap={1}>Timeline (imagen del timeline.png en assets/images)</Stack>
      <Stack gap={1}>
        Informacion de los buses (reutilizar componente buses ya creado y
        mejorarlo). Poner hora a la que salen los buses si en la invitación hay
        incluidos buses. (Huelva-10:30, Sevilla 11:15, Lucena-10:00) Los lugares
        e itinerario no los sabemos aun pero deja hueco para ponerlos.
      </Stack>
      <Stack gap={1}>
        Formulario de confirmación de asistencia. Aquí es donde los invitados
        pueden confirmar si asisten o no. Primero, veran los nombres de cada
        invitado y una casilla para confirmar asistencia de cada uno. Si
        confirman la asistencia de uno, les saldrá el formulario para ese mismo:
        alergias (campo texto libre), selección de plato principal (Arroz de
        rabo de toro-carne o Arroz con gambón austral - Marisco). Si un invitado
        está marcado como niño, saldrá que tiene asignado el menú infantil. Un
        campo libre de área para poner notas adicionales, que irán enlazadas a
        la invitación. Añadir al final que la fecha limite para confirmar es el
        14 de noviembre de 2025.
      </Stack>
      <Stack>
        {' '}
        Info adicional: Parking (habrá aparcamiento de sobra disponible), Enlace
        a album compartido (una app que pondremos para que todos suban fotos),
        Cuenta de banco para hacernos regalos, ya pensaré un buen mensaje para
        esto pero deja el hueco para que lo ponga.
      </Stack>
      <Stack> Botón para enviar formulario y confirmar asistencia</Stack>
    </Stack>
  );
};
