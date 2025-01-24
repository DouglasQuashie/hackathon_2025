import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area.tsx';
import { getEvents } from '../services/Api.ts';

interface Catastrophe {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const CatastrophePopup: React.FC<{zoneId: string}> = ({zoneId}) => {
	const [catastrophes, setCatastrophes] = useState<Catastrophe[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Appel à l'API pour récupérer les catastrophes
		const fetchCatastrophes = async () => {
			try {
				const events = await getEvents("catastrophe", zoneId); // Appel de la fonction getEvents
				setCatastrophes(events.data); // Mise à jour de l'état
			} catch (error) {
				console.error('Erreur lors de la récupération des catastrophes :', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCatastrophes();
	}, []); // Le tableau vide [] signifie que l'effet s'exécute uniquement lors du montage

	return (
		<Dialog>
			<DialogTrigger asChild>
			<Button className="cursor-pointer hover:bg-gray-200">Voir les catastrophes</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] z-[1000] bg-white">
			<DialogHeader>
				<DialogTitle>Liste des catastrophes</DialogTitle>
				<DialogDescription>
				Voici la liste des catastrophes récentes.
				</DialogDescription>
			</DialogHeader>
			<ScrollArea className="h-[300px] w-full rounded-md border p-4">
				{loading ? (
					<p>Chargement des données...</p>
				) : catastrophes.length === 0 ? (
				<p>Aucune catastrophe à signaler pour le moment.</p>
				) : (
				catastrophes.map((catastrophe) => (
					<div key={catastrophe.id} className="mb-4 last:mb-0">
						<h3 className="text-lg font-semibold">{catastrophe.title}</h3>
						<p className="text-sm text-gray-500">
							{new Date(catastrophe.createdAt).toLocaleString()}
						</p>
						<p className="mt-1">{catastrophe.content}</p>
					</div>
				))
				)}
			</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
