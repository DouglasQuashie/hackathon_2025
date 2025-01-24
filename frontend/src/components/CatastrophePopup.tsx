import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area.tsx';


interface Catastrophe {
	id: string;
	title: string;
	content: string;
	createdAt: string;
}

interface CatastrophePopupProps {
	catastrophes: Catastrophe[];
}

export const CatastrophePopup: React.FC<CatastrophePopupProps> = ({ catastrophes }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='cursor-pointer hover:bg-gray-200'>Voir les catastrophes</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] z-[1000] bg-white">
				<DialogHeader>
					<DialogTitle>Liste des catastrophes</DialogTitle>
					<DialogDescription>
						Voici la liste des catastrophes récentes.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-[300px] w-full rounded-md border p-4">
					{catastrophes.length === 0 ? (
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
