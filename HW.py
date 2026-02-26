import tkinter as tk


def submit():
    user_input = entry.get().strip()
    result = user_input.capitalize() + "!"
    output_label.config(text=result)
    entry.config(state="disabled")
    button.config(state="disabled")


root = tk.Tk()
root.title("Hello World")
root.resizable(False, False)

frame = tk.Frame(root, padx=20, pady=20)
frame.pack()

tk.Label(frame, text="Hello... Um. Line?", font=("Helvetica", 14)).pack(pady=(0, 10))

entry = tk.Entry(frame, font=("Helvetica", 12), width=20)
entry.pack(pady=(0, 10))
entry.focus()

button = tk.Button(frame, text="Submit", command=submit)
button.pack(pady=(0, 10))

output_label = tk.Label(frame, text="", font=("Helvetica", 14, "bold"))
output_label.pack()

root.bind("<Return>", lambda e: submit())
root.mainloop()
