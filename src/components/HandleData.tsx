import type { SocialNetwork, UserHandle } from '../types';

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {
  const enabledLinks: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled,
  );

  return (
    <>
      <div className="space-y-6 text-white">
        <p className="text-5xl text-center font-bold">{data.handle}</p>
        {data.imageUrl && (
          <div className="flex justify-center">
            <img
              src={data.imageUrl}
              alt={data.handle}
              className="rounded-full max-w-[180px] mx-auto"
            />
          </div>
        )}
        <p className="text-lg text-center font-semibold">{data.description}</p>

        <div className="mt-20 flex flex-col gap-6">
          {enabledLinks.length ? (
            enabledLinks.map((link: SocialNetwork) => (
              <a
                className="bg-white px-5 py-2 flex items-center rounded-lg"
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`/social/icon_${link.name.toLowerCase()}.svg`}
                  alt={link.name}
                  className="w-10 mr-2"
                />
                <p className="text-black capitalize font-bold text-lg">Visita mi: {link.name}</p>
              </a>
            ))
          ) : (
            <p>No hay enlaces para este perfil</p>
          )}
        </div>
      </div>
    </>
  );
}
