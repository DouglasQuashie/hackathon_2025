import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from '../hooks/use-toast.ts';
import { ZoneItem } from '../lib/chat/interfaces/Zone.ts';
import { getZones } from '../services/Api.ts';


interface EventFormProps {
	onEventCreated: (event: EventForm) => void;
}

interface EventForm {
	id: string;
	createdAt: string;
	title: string;
	zoneId: string;
	content: string;
	type: string;
}

const EventForm: React.FC<EventFormProps> = ({ onEventCreated }) => {

	const [zones, setZones] = useState<ZoneItem[]>([]);

	const form = useForm<EventForm>({
		defaultValues: {
			title: '',
			zoneId: '',
			content: '',
			type: 'catastrophe',
		},
	});

	const onSubmit = (data: EventForm) => {
		const newEvent: EventForm = {
			...data,
			id: uuidv4(),
			createdAt: new Date().toISOString(),
		};
		try {
			onEventCreated(newEvent);
			form.reset();
			toast({
				title: 'Activité créé',
				description: 'Votre nouvel événement a été créé avec succès.',
			});
			setTimeout(() => {
				location.replace("/");
			});
		} catch (e) {
			toast({
				title: 'Erreur',
				description: 'Veuillez renseigner toutes les informations.',
			});
		}


	};

	useEffect(() => {
		async function init() {
			const zones = await getZones();
			setZones(zones.data);
		}

		init();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Ajouter une catastrophe</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Titre</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Titre de l'événement"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem key={0} value={'Innodation'}>
											Innodation
										</SelectItem>
										<SelectItem key={1} value={'Seisme'}>
											Seisme
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage/>
							</FormItem>
						)}
					/>


					<FormField
						control={form.control}
						name="zoneId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Zone</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Sélectionnez une zone"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{zones.map((zone) => (
											<SelectItem key={zone.id} value={zone.id}>
												Zone {zone.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contenu</FormLabel>
								<FormControl>
									<Textarea placeholder="Contenu de l'événement" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<Button type="submit">Créer le catastrophe</Button>
				</form>
			</Form>
		</div>
	);
};

export default EventForm;
