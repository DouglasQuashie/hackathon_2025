import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area.tsx';
import { getEvents } from '../services/Api.ts';


interface Activity {
	id: string;
	title: string;
	content: string;
	createdAt: string;
}

interface ActivityPopupProps {
	activities: Activity[];
}

export const ActivityPopup: React.FC = () => {

	const [activities, setActivities] = useState<Activity[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Appel à l'API pour récupérer les catastrophes
		const fetchActivities = async () => {
			try {
				const events = await getEvents("activity"); // Appel de la fonction getEvents
				setActivities(events.data); // Mise à jour de l'état
			} catch (error) {
				console.error('Erreur lors de la récupération des catastrophes :', error);
			} finally {
				setLoading(false);
			}
		};

		fetchActivities();
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='cursor-pointer hover:bg-gray-200'>Voir les activités</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] z-[1000] bg-white">
				<DialogHeader>
					<DialogTitle>Liste des activités</DialogTitle>
					<DialogDescription>
						Voici la liste des activités récentes.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-[300px] w-full rounded-md border p-4">
					{activities.length === 0 ? (
						<p>Aucune activité à signaler pour le moment.</p>
					) : (
						activities.map((activity) => (
							<div key={activity.id} className="mb-4 last:mb-0">
								<h3 className="text-lg font-semibold">{activity.title}</h3>
								<p className="text-sm text-gray-500">
									{new Date(activity.createdAt).toLocaleString()}
								</p>
								<p className="mt-1">{activity.content}</p>
							</div>
						))
					)}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
