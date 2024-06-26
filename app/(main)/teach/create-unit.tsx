'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function AddUnit() {
  const [open, setOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const onSubmit = async (data: FormInputs) => {
    setOpen(false);

    data.subjectId = Number(params.id);

    try {
      //@ts-ignore
      const result = await addUnit(data);
      //@ts-ignore
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Failed to add subject',
          //@ts-ignore
          description: result?.error.message,
        });
      } else {
        router.refresh();
        toast({
          title: 'Unit added successfully',
          variant: 'primary',
        });
      }
    } catch (error) {
      console.error('error', error);
      const errorMessage = (error as Error).message;
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: errorMessage,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Unit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add unit</DialogTitle>
          <DialogDescription>Add a new unit to this subject</DialogDescription>
        </DialogHeader>
        <UnitForm setOpen={setOpen} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUnit } from '@/controllers/unit';
import { insertUnitSchema } from '@/schemas/units';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';

export type FormInputs = z.infer<typeof insertUnitSchema>;

export function UnitForm({
  setOpen,
  subjectId,
  defaultName = '',
  defaultDescription = '',
  defaultQuestionsPerQuiz = 10,
  onSubmit,
}: {
  setOpen?: (open: boolean) => void;
  subjectId?: number;
  defaultName?: string;
  defaultDescription?: string;
  defaultQuestionsPerQuiz?: number;
  onSubmit: (data: FormInputs) => void;
}) {
  const form = useForm<FormInputs>({
    resolver: zodResolver(insertUnitSchema),
    defaultValues: {
      name: defaultName,
      description: defaultDescription,
      questionsPerQuiz: defaultQuestionsPerQuiz,
    },
  });
  const { control, handleSubmit } = form;
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="questionsPerQuiz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Questions per quiz</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onKeyDown={evt =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button onClick={handleSubmit(onSubmit)}>Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
