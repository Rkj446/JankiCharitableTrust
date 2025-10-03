import tkinter as tk
from tkinter import messagebox, ttk
import random
import os
from pathlib import Path

class NumberGuessingGame:
    MAX_LEVEL = 25

    def __init__(self, master):
        self.master = master
        master.title("Ascending Difficulty Guesser")
        master.configure(bg='#37474F')
        master.geometry("500x550")
        master.resizable(False, False)

        # Game State
        self.current_level = 1
        self.secret_number = 0
        self.remaining_attempts = 0
        self.max_range = 0
        self.min_range = 1

        # High Score State (store in user’s home directory)
        self.high_score = 0
        self.high_score_file = Path.home() / ".number_guessing_highscore.txt"

        # Configure styles
        self.style = ttk.Style()
        self.style.configure('TFrame', background='#455A64')
        self.style.configure('TLabel', background='#455A64', foreground='#ECEFF1', font=('Inter', 13))
        self.style.configure('Title.TLabel', background='#455A64', foreground='#00BCD4', font=('Inter', 22, 'bold'))
        self.style.configure('TButton', font=('Inter', 12, 'bold'), padding=12, background='#00BCD4', foreground='#455A64')
        self.style.map('TButton', background=[('active', '#0097A7'), ('pressed', '#006064')],
                       foreground=[('active', '#FFFFFF')])
        self.style.configure('Secondary.TButton', font=('Inter', 10), padding=8, background='#78909C', foreground='#ECEFF1')
        self.style.map('Secondary.TButton', background=[('active', '#607D8B'), ('pressed', '#455A64')],
                       foreground=[('active', '#FFFFFF')])
        self.style.configure('Success.TLabel', foreground='#8BC34A', font=('Inter', 15, 'bold'))
        self.style.configure('Error.TLabel', foreground='#FF5252', font=('Inter', 15, 'bold'))
        self.style.configure('Highscore.TLabel', foreground='#FFC107', font=('Inter', 12, 'bold'))

        # Main frame
        self.main_frame = ttk.Frame(master, padding="30 30 30 30", style='TFrame')
        self.main_frame.pack(padx=20, pady=20, fill=tk.BOTH, expand=True)

        # --- UI Elements ---
        self.title_label = ttk.Label(self.main_frame, text="The Level-Up Guesser", style='Title.TLabel')
        self.title_label.grid(row=0, column=0, columnspan=2, pady=(0, 25), sticky='ew')

        self.level_var = tk.StringVar(value=f"Level: {self.current_level} / {self.MAX_LEVEL}")
        ttk.Label(self.main_frame, textvariable=self.level_var, font=('Inter', 16, 'bold'), style='TLabel').grid(row=1, column=0, columnspan=2, pady=(10, 5), sticky='ew')

        self.attempts_var = tk.StringVar()
        ttk.Label(self.main_frame, textvariable=self.attempts_var, style='TLabel').grid(row=2, column=0, columnspan=2, pady=5, sticky='ew')

        self.range_var = tk.StringVar()
        ttk.Label(self.main_frame, textvariable=self.range_var, foreground='#BDBDBD', style='TLabel').grid(row=3, column=0, columnspan=2, pady=5, sticky='ew')

        self.high_score_var = tk.StringVar(value="High Score: Level 0")
        ttk.Label(self.main_frame, textvariable=self.high_score_var, style='Highscore.TLabel').grid(row=4, column=0, columnspan=2, pady=(15, 20), sticky='ew')

        ttk.Label(self.main_frame, text="Your Guess:", style='TLabel').grid(row=5, column=0, padx=5, pady=10, sticky='w')
        self.guess_entry = ttk.Entry(self.main_frame, font=('Inter', 14))
        self.guess_entry.grid(row=5, column=1, padx=5, pady=10, sticky='ew')
        self.guess_entry.bind('<Return>', lambda event: self.check_guess())

        self.submit_button = ttk.Button(self.main_frame, text="SUBMIT GUESS", command=self.check_guess)
        self.submit_button.grid(row=6, column=0, columnspan=2, pady=(25, 10), sticky='ew')

        self.button_frame = ttk.Frame(self.main_frame, style='TFrame')
        self.button_frame.grid(row=7, column=0, columnspan=2, pady=(10, 15), sticky='ew')
        ttk.Button(self.button_frame, text="Start New Game", command=self.new_game, style='Secondary.TButton').pack(side=tk.LEFT, padx=5, expand=True, fill=tk.X)
        ttk.Button(self.button_frame, text="Reset High Score", command=self.prompt_reset_high_score, style='Secondary.TButton').pack(side=tk.RIGHT, padx=5, expand=True, fill=tk.X)

        self.feedback_var = tk.StringVar()
        self.feedback_label = ttk.Label(self.main_frame, textvariable=self.feedback_var, style='TLabel')
        self.feedback_label.grid(row=8, column=0, columnspan=2, pady=(10, 0), sticky='ew')

        self.main_frame.columnconfigure(0, weight=1)
        self.main_frame.columnconfigure(1, weight=1)

        self.load_high_score()
        self.start_new_level()

    # --- Persistence ---
    def load_high_score(self):
        if os.path.exists(self.high_score_file):
            try:
                with open(self.high_score_file, 'r') as f:
                    score_str = f.read().strip()
                    self.high_score = int(score_str) if score_str.isdigit() else 0
            except:
                self.high_score = 0
        self.high_score_var.set(f"High Score: Level {self.high_score}")

    def save_high_score(self):
        try:
            with open(self.high_score_file, 'w') as f:
                f.write(str(self.high_score))
        except:
            pass

    # --- Controls ---
    def new_game(self):
        if messagebox.askyesno("Start New Game", "Restart from Level 1?"):
            self.current_level = 1
            self.start_new_level()

    def prompt_reset_high_score(self):
        if messagebox.askyesno("Reset High Score", "This will wipe your High Score. Continue?"):
            self.high_score = 0
            self.save_high_score()
            self.high_score_var.set("High Score: Level 0")
            messagebox.showinfo("Reset Complete", "High Score reset to 0.")

    # --- Game Logic ---
    def calculate_difficulty(self, level):
        max_value = 100 + (level - 1) * 300
        base_attempts = 11
        attempts_reduction = (level - 1) // 5
        max_attempts = max(6, base_attempts - attempts_reduction)
        return max_value, max_attempts

    def start_new_level(self):
        if self.current_level > self.MAX_LEVEL:
            self.game_over(True)
            return

        self.max_range, self.remaining_attempts = self.calculate_difficulty(self.current_level)
        self.secret_number = random.randint(self.min_range, self.max_range)

        self.level_var.set(f"Level: {self.current_level} / {self.MAX_LEVEL}")
        self.attempts_var.set(f"Attempts Remaining: {self.remaining_attempts}")
        self.range_var.set(f"Guess between {self.min_range} and {self.max_range}")
        self.feedback_var.set("I've picked a new number. Start guessing!")
        self.feedback_label.config(style='TLabel')

        self.guess_entry.config(state=tk.NORMAL)
        self.guess_entry.delete(0, tk.END)
        self.guess_entry.focus_set()
        self.submit_button.config(state=tk.NORMAL)

    def check_guess(self):
        try:
            guess = int(self.guess_entry.get())
        except ValueError:
            self.feedback_var.set("Please enter a valid whole number.")
            self.feedback_label.config(style='Error.TLabel')
            return

        if not (self.min_range <= guess <= self.max_range):
            self.feedback_var.set(f"Your guess must be between {self.min_range} and {self.max_range}!")
            self.feedback_label.config(style='Error.TLabel')
            return

        self.remaining_attempts -= 1

        if guess == self.secret_number:
            self.feedback_var.set(f"🏆 Correct! It was {self.secret_number}!")
            self.feedback_label.config(style='Success.TLabel')
            self.submit_button.config(state=tk.DISABLED)
            self.guess_entry.config(state=tk.DISABLED)

            self.current_level += 1
            if self.current_level <= self.MAX_LEVEL:
                self.master.after(2000, self.start_new_level)
            else:
                self.master.after(2000, lambda: self.game_over(True))

        elif self.remaining_attempts <= 0:
            self.feedback_var.set(f"❌ Game Over! The number was {self.secret_number}.")
            self.feedback_label.config(style='Error.TLabel')
            self.game_over(False)

        else:
            abs_diff = abs(guess - self.secret_number)
            very_close_threshold = max(2, self.max_range * 0.01)
            warm_threshold = max(10, self.max_range * 0.05)

            if abs_diff <= very_close_threshold:
                closeness_hint = "🔥 Extremely Hot!"
                current_style = 'Success.TLabel'
            elif abs_diff <= warm_threshold:
                closeness_hint = "🟡 Getting Warmer."
                current_style = 'Highscore.TLabel'
            else:
                closeness_hint = "🧊 Cold."
                current_style = 'TLabel'

            direction_hint = "Too low" if guess < self.secret_number else "Too high"
            self.feedback_var.set(f"{closeness_hint} | {direction_hint}. | Attempts left: {self.remaining_attempts}")
            self.attempts_var.set(f"Attempts Remaining: {self.remaining_attempts}")
            self.feedback_label.config(style=current_style)
            self.guess_entry.delete(0, tk.END)

    def game_over(self, won_game):
        if won_game and self.current_level > self.MAX_LEVEL:
            level_achieved = self.MAX_LEVEL
        elif won_game:
            level_achieved = self.current_level - 1
        else:
            level_achieved = self.current_level

        if level_achieved > self.high_score:
            self.high_score = level_achieved
            self.save_high_score()
            self.high_score_var.set(f"High Score: Level {self.high_score} (NEW RECORD!)")

        if level_achieved == self.MAX_LEVEL:
            final_message = "🎉 YOU BEAT THE GAME! 🎉\n\nCongratulations!"
        else:
            final_message = f"You reached Level {level_achieved}."

        self.submit_button.config(state=tk.DISABLED)
        self.guess_entry.config(state=tk.DISABLED)

        if messagebox.askyesno("Game Over", final_message + "\n\nPlay again?"):
            self.current_level = 1
            self.start_new_level()
        else:
            self.master.quit()

if __name__ == '__main__':
    root = tk.Tk()
    game = NumberGuessingGame(root)
    root.mainloop()