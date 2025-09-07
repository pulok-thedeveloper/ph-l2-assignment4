import { Button } from '@/components/ui/button';
import Books from '../books/Books';

const Home = () => {
    return (
        <div>
            <section className="relative py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    Welcome to Your Digital Library
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Effortlessly manage your books and borrowed records. Browse a rich
                    collection, track availability in real time, and keep your library
                    organized with ease.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button size="lg">Browse Books</Button>
                    <Button variant="outline" size="lg">
                        Learn More
                    </Button>
                    </div>
                </div>
            </section>
            <Books/>
        </div>
    );
};

export default Home;