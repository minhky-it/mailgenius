import { Collapse } from "antd";
function Categories({report}) {
	return(
		<>
			<h2 className="text-2xl font-semibold mb-4">Categories</h2>
			{Object.values(report.categories).map((category) => (
				<Collapse
					className="my-4"
					items={[
						{
							key: `${category.id}`,
							label: `${category.title}`,
							children: (
								<>
									<p className="text-gray-800">{category.description}</p>
									<h4 className="mt-2 font-semibold">Audit References:</h4>
									<div className="grid grid-cols-1 md:grid-cols-6 gap-4">
										{category.auditRefs.map((audit) => (
											<div
												key={audit.id}
												className="bg-gray-100 p-2 rounded-md"
											>
												<strong>{audit.acronym || audit.id}</strong> (Weight:{" "}
												{audit.weight})
											</div>
										))}
									</div>
								</>
							),
							extra: (
								<span className="bg-slate-700 px-2 py-1 rounded-sm text-white">
									{category.score * 100}  scores
								</span>
							),
						},
					]}
				/>
			))}
		</>
	);
}
export default Categories;
