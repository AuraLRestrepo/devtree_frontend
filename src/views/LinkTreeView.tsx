import { useEffect, useState } from 'react';
import { social } from '../data/social';
import DevTreeInput from '../components/DevTreeInput';
import { isValidUrl } from '../utils';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../api/DevTreeAPI';
import type { SocialNetwork, User } from '../types';

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(['user'])!;

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Links actualizados correctamente');
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name,
      );

      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }

      return item;
    });
    setDevTreeLinks(updatedData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) => {
      return link.name === e.target.name ? { ...link, url: e.target.value } : link;
    });
    setDevTreeLinks(updatedLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return {
            ...link,
            enabled: !link.enabled,
          };
        } else {
          toast.error('Por favor, ingresa una URL válida antes de habilitar el enlace');
          return link;
        }
      }

      return link;
    });

    setDevTreeLinks(updatedLinks);

    let updatedIems: SocialNetwork[] = [];

    const selectedSocialNetwork = updatedLinks.find((link) => link.name === socialNetwork);

    if (selectedSocialNetwork?.enabled) {
      const id = Math.max(0, ...links.map((link) => link.id || 0)) + 1;

      if (links.some((link) => link.name === socialNetwork)) {
        updatedIems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id,
              url: selectedSocialNetwork.url,
            };
          }

          return link;
        });
      } else {
        updatedIems = [
          ...links,
          {
            ...selectedSocialNetwork,
            id,
          } as SocialNetwork,
        ];
      }
    } else {
      const linkToDisable = links.find((link) => link.name === socialNetwork);

      const removedId = linkToDisable?.id || 0;

      updatedIems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            enabled: false,
            id: 0,
          };
        }

        if (link.id > removedId) {
          return {
            ...link,
            id: link.id - 1,
          };
        }

        return link;
      });
    }

    // Reordenar IDs para evitar inconsistencias
    const enabledLinks = updatedIems.filter((link) => link.enabled).sort((a, b) => a.id - b.id);

    let currentId = 1;

    enabledLinks.forEach((enabledLink) => {
      const index = updatedIems.findIndex((link) => link.name === enabledLink.name);

      if (index !== -1) {
        updatedIems[index] = {
          ...updatedIems[index],
          id: currentId++,
        };
      }
    });

    updatedIems = updatedIems.map((link) => ({
      ...link,
      id: link.enabled ? link.id : 0,
    }));

    console.log(updatedIems);

    queryClient.setQueryData(['user'], (prevData: User) => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        links: JSON.stringify(updatedIems),
      };
    });
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
        onClick={() => mutate(user)}
      >
        Guardar Cambios
      </button>
    </div>
  );
}
