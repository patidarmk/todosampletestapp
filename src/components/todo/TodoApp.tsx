import { useState, useMemo } from 'react';
import { Todo } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter, { FilterType } from './TodoFilter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-card/80 backdrop-blur-lg shadow-2xl shadow-black/5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">My Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <TodoForm onAdd={addTodo} />
          <Separator />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </CardContent>
        {todos.length > 0 && (
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
             <span className="text-sm text-muted-foreground">
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>
            <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default TodoApp;