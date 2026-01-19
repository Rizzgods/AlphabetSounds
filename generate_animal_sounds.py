"""
Script to generate MP3 files for all animal phrases using Microsoft Edge TTS.
This will create reliable audio files that work on all mobile devices.
"""

import asyncio
import edge_tts
import os

# Create output directory
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'portfolio', 'static', 'animal_sounds')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Voice to use - friendly female voice
VOICE = "en-US-AnaNeural"  # Child-friendly voice

# All animals from the alphabet game
animals = [
    # A
    ('A', 'Alligator'),
    ('A', 'Antelope'),
    ('A', 'Ape'),
    # B
    ('B', 'Bear'),
    ('B', 'Bat'),
    ('B', 'Buffalo'),
    # C
    ('C', 'Cat'),
    ('C', 'Cow'),
    ('C', 'Crocodile'),
    # D
    ('D', 'Dog'),
    ('D', 'Dolphin'),
    ('D', 'Deer'),
    # E
    ('E', 'Elephant'),
    ('E', 'Eagle'),
    ('E', 'Eel'),
    # F
    ('F', 'Fox'),
    ('F', 'Frog'),
    ('F', 'Fish'),
    # G
    ('G', 'Giraffe'),
    ('G', 'Goat'),
    ('G', 'Gorilla'),
    # H
    ('H', 'Hippo'),
    ('H', 'Horse'),
    ('H', 'Hamster'),
    # I
    ('I', 'Iguana'),
    ('I', 'Insect'),
    ('I', 'Impala'),
    # J
    ('J', 'Jaguar'),
    ('J', 'Jellyfish'),
    ('J', 'Jackal'),
    # K
    ('K', 'Koala'),
    ('K', 'Kangaroo'),
    ('K', 'Kingfisher'),
    # L
    ('L', 'Lion'),
    ('L', 'Leopard'),
    ('L', 'Lizard'),
    # M
    ('M', 'Monkey'),
    ('M', 'Mouse'),
    ('M', 'Moose'),
    # N
    ('N', 'Newt'),
    ('N', 'Narwhal'),
    ('N', 'Nightingale'),
    # O
    ('O', 'Owl'),
    ('O', 'Octopus'),
    ('O', 'Ostrich'),
    # P
    ('P', 'Parrot'),
    ('P', 'Penguin'),
    ('P', 'Pig'),
    # Q
    ('Q', 'Quail'),
    ('Q', 'Queen Bee'),
    ('Q', 'Quokka'),
    # R
    ('R', 'Rabbit'),
    ('R', 'Raccoon'),
    ('R', 'Rhinoceros'),
    # S
    ('S', 'Snake'),
    ('S', 'Sheep'),
    ('S', 'Shark'),
    # T
    ('T', 'Tiger'),
    ('T', 'Turtle'),
    ('T', 'Turkey'),
    # U
    ('U', 'Unicorn'),
    ('U', 'Urchin'),
    ('U', 'Uakari'),
    # V
    ('V', 'Vulture'),
    ('V', 'Vicuna'),
    ('V', 'Viper'),
    # W
    ('W', 'Wolf'),
    ('W', 'Whale'),
    ('W', 'Worm'),
    # X
    ('X', 'X-ray Fish'),
    ('X', 'Xenops'),
    ('X', 'Xantus Hummingbird'),
    # Y
    ('Y', 'Yak'),
    ('Y', 'Yellowfin Tuna'),
    ('Y', 'Yabby'),
    # Z
    ('Z', 'Zebra'),
    ('Z', 'Zebu'),
    ('Z', 'Zorilla'),
]

async def generate_audio(phrase, filepath):
    """Generate a single audio file."""
    communicate = edge_tts.Communicate(phrase, VOICE, rate="-10%", pitch="+5Hz")
    await communicate.save(filepath)

async def generate_all_sounds():
    """Generate MP3 files for each animal phrase."""
    print(f"Generating {len(animals)} animal sound files...")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Using voice: {VOICE}")
    
    for letter, animal in animals:
        # Create the phrase
        phrase = f"{letter} is for {animal}"
        
        # Create safe filename (replace spaces and special chars)
        safe_name = animal.replace(' ', '_').replace('-', '_')
        filename = f"{letter}_{safe_name}.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        # Generate TTS
        try:
            await generate_audio(phrase, filepath)
            # Verify file size
            size = os.path.getsize(filepath)
            print(f"✓ Generated: {filename} ({size} bytes)")
        except Exception as e:
            print(f"✗ Error generating {filename}: {e}")
    
    print(f"\nDone! Generated {len(animals)} MP3 files in {OUTPUT_DIR}")

if __name__ == '__main__':
    asyncio.run(generate_all_sounds())
