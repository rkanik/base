import { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import BaseActionsButton from './BaseActionsButton'
import BaseConfirmDialog from './BaseConfirmDialog'
import { zodResolver } from '@hookform/resolvers/zod'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import {
	Alert,
	AlertTitle,
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	LinearProgress,
	MenuItem,
	Pagination,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const BaseCrudMui5 = ({
	query,
	params,
	setParams,
	getFormValues,
	createMutation,
	updateMutation,
	deleteMutation,
	onMutationSuccess,
	title = 'Base Crud',
	schema = z.object({}),
	CreateIcon = AddIcon,
	formTitle = 'Form Title',
	submitTitle = 'Submit',
	createTitle = 'Create',
	formMaxWidth = 'sm',
	fields = [],
	actions = [],
	headers: headersProp = [],
	showCreate = true,
	perPageOptions = [5, 10, 20, 30, 50, 100],
}) => {
	//
	const [open, setOpen] = useState(false)
	const [update, setUpdate] = useState(false)
	const [deleteItem, setDeleteItem] = useState(null)

	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const isSubmitting = createMutation?.isLoading || updateMutation?.isLoading

	const form = useForm({
		resolver: zodResolver(schema),
		getFormValues: async () => getFormValues(),
	})

	//
	const onOpen = useCallback(() => {
		setOpen(true)
	}, [])

	const onClose = useCallback(async () => {
		if (isSubmitting) {
			return
		}
		setOpen(false)
		setUpdate(false)
		form.reset(getFormValues())
	}, [form, isSubmitting, getFormValues])

	const onSubmit = useCallback(
		(data) => {
			const mutation = update ? updateMutation : createMutation
			mutation?.mutate(data, {
				onError(err) {
					if (err.response.data.errors) {
						Object.entries(err.response.data.errors).forEach(
							([key, value]) => {
								form.setError(key, {
									message: value[0],
								})
							},
						)
						return
					}
					form.setError('root', {
						message:
							err.response.data.message ||
							'Something went wrong! Please try again later.',
					})
				},
				onSuccess(res) {
					onClose()
					onMutationSuccess?.(res)
				},
			})
		},
		[
			form,
			update,
			onClose,
			createMutation,
			updateMutation,
			onMutationSuccess,
		],
	)

	const onDelete = useCallback(() => {
		deleteMutation?.mutate(deleteItem, {
			onSuccess() {
				setDeleteItem(null)
				onMutationSuccess?.()
			},
		})
	}, [deleteMutation, deleteItem, onMutationSuccess])

	const headers = useMemo(() => {
		if (actions.length) {
			return [
				...headersProp,
				{
					name: 'Actions',
					value: 'actions',
					sx: {
						cell: { textAlign: 'right' },
						header: { textAlign: 'right' },
					},
					computed(item) {
						return (
							<BaseActionsButton
								actions={actions.map((action) => ({
									...action,
									onClick({ item, event }) {
										action.onClick?.({
											item,
											event,
											context: {
												update() {
													form.reset(getFormValues(item))
													setUpdate(true)
													onOpen()
												},
												delete() {
													setDeleteItem(item)
												},
											},
										})
									},
								}))}
								item={item}
							/>
						)
					},
				},
			]
		}
		return headersProp
	}, [form, headersProp, actions, getFormValues, onOpen])

	const searchTimeout = useRef(null)
	const [search, setSearch] = useState(params?.search || '')
	const onChangeSearch = (e) => {
		setSearch(e.target.value)
		clearTimeout(searchTimeout.current)
		searchTimeout.current = setTimeout(() => {
			setParams((prev) => ({
				...prev,
				page: 1,
				search: e.target.value,
			}))
		}, 300)
	}

	const onClearSearch = useCallback(() => {
		setSearch('')
		setParams((prev) => ({
			...prev,
			page: 1,
			search: '',
		}))
	}, [setParams])

	//
	return (
		<Fragment>
			<Stack maxHeight={'100%'}>
				<Stack
					px={1}
					pt={2}
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography variant="h5" fontWeight={600}>
						{title}
					</Typography>
					<Stack>
						{showCreate && (
							<Button
								color="primary"
								variant="contained"
								startIcon={<CreateIcon />}
								disableElevation
								onClick={onOpen}
							>
								{createTitle}
							</Button>
						)}
					</Stack>
				</Stack>
				<Box px={1}>
					<TextField
						sx={{ width: 350 }}
						size="small"
						label="Search..."
						variant="standard"
						value={search}
						onChange={onChangeSearch}
						InputProps={{
							endAdornment: search && (
								<IconButton size="small" onClick={onClearSearch}>
									<CloseIcon />
								</IconButton>
							),
						}}
					/>
				</Box>
				<Stack p={1} flex={1} overflow={'hidden'}>
					<Stack overflow={'auto'}>
						<TableContainer sx={{ position: 'relative', zIndex: 1 }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										{headers.map((header) => (
											<TableCell
												key={header.value}
												sx={{
													color: '#ffffff',
													bgcolor: '#3674B5',
													fontWeight: 'bold',
													paddingY: 1,
													paddingX: 1,
													...header.sx,
												}}
											>
												{header.name}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell
											sx={{ padding: 0, height: 4 }}
											colSpan={headers.length}
										>
											{(query?.isLoading || query?.isRefetching) && (
												<LinearProgress color="primary" />
											)}
										</TableCell>
									</TableRow>
									{(query?.data?.data || []).map((row, rowIndex) => (
										<TableRow key={rowIndex}>
											{headers.map((header, cellIndex) => (
												<TableCell
													sx={{
														paddingY: 0,
														paddingX: 1,
														...header.sx,
													}}
													key={`${rowIndex}-${cellIndex}`}
												>
													{header.computed
														? header.computed(row, header)
														: row[header.value]}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Stack>
				</Stack>
				{query.isFetched && (
					<Stack
						p={1}
						direction={'row'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Typography variant="body2">
							Showing {query?.data?.from} to {query?.data?.to} of{' '}
							{query?.data?.total} items
						</Typography>
						<Stack
							spacing={1}
							direction={'row'}
							alignItems={'center'}
							justifyContent="end"
						>
							<Typography variant="body2">Per Page:</Typography>
							<Select
								size="small"
								value={params?.per_page}
								onChange={(e) => {
									setParams((prev) => ({
										...prev,
										page: 1,
										per_page: e.target.value,
									}))
								}}
							>
								{perPageOptions.map((item) => (
									<MenuItem key={item} value={item}>
										{item}
									</MenuItem>
								))}
							</Select>
							<Pagination
								showLastButton
								showFirstButton
								page={query?.data?.current_page}
								defaultPage={query?.data?.current_page}
								count={Math.ceil(
									(query?.data?.total || 10) /
										(+query?.data?.per_page || 10),
								)}
								onChange={(_, page) => {
									setParams((prev) => {
										console.log(prev)
										return {
											...prev,
											page,
										}
									})
								}}
							/>
						</Stack>
					</Stack>
				)}
			</Stack>
			<Dialog
				open={open}
				fullWidth
				maxWidth={formMaxWidth}
				fullScreen={fullScreen}
				onClose={onClose}
				PaperProps={{
					component: 'form',
					onSubmit: form.handleSubmit(onSubmit),
				}}
			>
				<FormProvider {...form}>
					<DialogTitle fontWeight={600}>
						{typeof formTitle === 'function'
							? formTitle(update)
							: formTitle}
					</DialogTitle>
					<IconButton
						disabled={isSubmitting}
						aria-label="close"
						onClick={onClose}
						sx={(theme) => ({
							top: 8,
							right: 8,
							position: 'absolute',
							color: theme.palette.error.main,
						})}
					>
						<CloseIcon />
					</IconButton>
					<DialogContent sx={{ paddingTop: 0 }}>
						<Grid container spacing={2}>
							{form.formState.errors.root && (
								<Grid item xs={12}>
									<Alert
										severity="error"
										action={
											<IconButton
												size="small"
												color="inherit"
												onClick={() => {
													form.clearErrors('root')
												}}
											>
												<CloseIcon fontSize="inherit" />
											</IconButton>
										}
									>
										<AlertTitle>Error</AlertTitle>
										{form.formState.errors.root.message}
									</Alert>
								</Grid>
							)}
							{fields.map((item) => (
								<Grid item xs={12} key={item.name}>
									<Controller
										name={item.name}
										control={form.control}
										render={({ field, fieldState: { error } }) => {
											if (item.type === 'autocomplete') {
												return (
													<Autocomplete
														fullWidth
														filterSelectedOptions
														options={item.options}
														loading={item.loading}
														multiple={item.multiple}
														onFocus={item.onFocus}
														getOptionKey={item.getOptionKey}
														getOptionLabel={item.getOptionLabel}
														isOptionEqualToValue={
															item.isOptionEqualToValue
														}
														value={field.value}
														onChange={(_, value) => {
															field.onChange(value)
														}}
														renderInput={(params) => (
															<TextField
																{...params}
																error={!!error}
																helperText={error?.message}
																label={item.label}
																placeholder={item.placeholder}
																InputProps={{
																	...params.InputProps,
																	endAdornment: (
																		<Fragment>
																			{item.loading ? (
																				<CircularProgress
																					color="inherit"
																					size={20}
																				/>
																			) : null}
																			{
																				params.InputProps
																					.endAdornment
																			}
																		</Fragment>
																	),
																}}
															/>
														)}
													/>
												)
											}
											return (
												<TextField
													{...field}
													{...item.props}
													fullWidth
													label={item.label}
													margin="dense"
													variant="outlined"
													error={!!error}
													helperText={error?.message}
												/>
											)
										}}
									/>
								</Grid>
							))}
						</Grid>
					</DialogContent>
					<DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
						<Button
							disabled={isSubmitting}
							color="error"
							disableElevation
							onClick={onClose}
						>
							Cancel
						</Button>
						<LoadingButton
							loading={isSubmitting}
							disabled={isSubmitting}
							size="large"
							color="primary"
							variant="contained"
							disableElevation
							type="submit"
						>
							{typeof submitTitle === 'function'
								? submitTitle(update)
								: submitTitle}
						</LoadingButton>
					</DialogActions>
				</FormProvider>
			</Dialog>
			<BaseConfirmDialog
				description="Once you click the delete button it will delete permanently."
				openDialog={!!deleteItem}
				handleCloseDialog={() => setDeleteItem(null)}
				actionButton={
					<LoadingButton
						color="error"
						variant="contained"
						loading={deleteMutation?.isLoading}
						disabled={deleteMutation?.isLoading}
						startIcon={<DeleteIcon fontSize="medium" />}
						onClick={onDelete}
						disableElevation
					>
						Delete
					</LoadingButton>
				}
			/>
		</Fragment>
	)
}
