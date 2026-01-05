import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

const RSVPForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes',
        guests: 1,
        allergies: {
            gluten: false,
            lactose: false,
            vegetarian: false,
            vegan: false,
            nuts: false,
            shellfish: false
        },
        otherAllergies: '',
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    const allergens = [
        { id: 'gluten', label: 'Sin gluten (Celíaco)' },
        { id: 'lactose', label: 'Sin lactosa' },
        { id: 'vegetarian', label: 'Vegetariano' },
        { id: 'vegan', label: 'Vegano' },
        { id: 'nuts', label: 'Alergia a frutos secos' },
        { id: 'shellfish', label: 'Alergia a mariscos' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="text-center py-12 bg-white/50 rounded-xl">
                <div className="w-16 h-16 bg-wedding-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-wedding-olive" />
                </div>
                <h3 className="font-serif text-2xl text-stone-800 mb-2">¡Gracias por confirmar!</h3>
                <p className="text-stone-600">Hemos recibido tu respuesta correctamente.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto text-left">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Nombre Completo</label>
                    <input 
                        required
                        type="text" 
                        className="w-full px-4 py-2 rounded border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-gold bg-white/80"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Email (Opcional)</label>
                    <input 
                        type="email" 
                        className="w-full px-4 py-2 rounded border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-gold bg-white/80"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-2">¿Asistirás?</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="attending"
                                checked={formData.attending === 'yes'}
                                onChange={() => setFormData({...formData, attending: 'yes'})}
                                className="text-wedding-olive focus:ring-wedding-olive"
                            />
                            <span>Sí, allí estaré</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="attending"
                                checked={formData.attending === 'no'}
                                onChange={() => setFormData({...formData, attending: 'no'})}
                                className="text-wedding-olive focus:ring-wedding-olive"
                            />
                            <span>No podré asistir</span>
                        </label>
                    </div>
                </div>

                {formData.attending === 'yes' && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-stone-600 mb-1">Número de invitados</label>
                            <input 
                                type="number" 
                                min="1" 
                                max="10"
                                className="w-24 px-4 py-2 rounded border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-gold bg-white/80"
                                value={formData.guests}
                                onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-stone-600">Alergias e intolerancias</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {allergens.map(allergen => (
                                    <label key={allergen.id} className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
                                        <input 
                                            type="checkbox"
                                            checked={formData.allergies[allergen.id]}
                                            onChange={e => setFormData({
                                                ...formData, 
                                                allergies: {...formData.allergies, [allergen.id]: e.target.checked}
                                            })}
                                            className="rounded text-wedding-olive focus:ring-wedding-olive"
                                        />
                                        {allergen.label}
                                    </label>
                                ))}
                            </div>
                            <input 
                                type="text"
                                placeholder="Otras alergias..."
                                className="w-full mt-2 px-4 py-2 rounded border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-gold bg-white/80 text-sm"
                                value={formData.otherAllergies}
                                onChange={e => setFormData({...formData, otherAllergies: e.target.value})}
                            />
                        </div>
                    </div>
                )}
            </div>

            <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-stone-800 text-white py-3 rounded hover:bg-stone-700 transition-colors duration-300 font-serif text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {status === 'submitting' ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    'Confirmar Asistencia'
                )}
            </button>
        </form>
    );
};

export default RSVPForm;
